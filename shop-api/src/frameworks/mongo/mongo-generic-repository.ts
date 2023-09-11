import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { IGenericRepository } from 'src/core';

export class MongoGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Model<T>;
  private _populateOnFind: string[];

  constructor(repository: Model<T>, populateOnFind: string[] = []) {
    this._repository = repository;
    this._populateOnFind = populateOnFind;
  }

  getByProperty(query: { [P in keyof T]?: any }): Promise<T> {
    return this._repository.findOne<T>(query).lean();
  }

  getAll(): Promise<T[]> {
    return this._repository.find().populate(this._populateOnFind).lean();
  }

  get(id: string): Promise<T> {
    return this._repository
      .findById(id)
      .populate(this._populateOnFind)
      .lean() as Promise<T>;
  }

  async create(item: T): Promise<T> {
    try {
      const result = await this._repository.create(item);
      if (result) {
        result.id = result._id;
        delete result._id;
        delete result.__v;
      }

      return result;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException({
          message: 'Duplicate property',
          statusCode: 400,
          error: { value: error.keyValue },
        });
      } else {
        throw new BadRequestException();
      }
    }
  }

  update(id: string, item: T): Promise<T> {
    return this._repository.findByIdAndUpdate(id, item, { new: true }).lean();
  }

  delete(id: string): Promise<T> {
    return this._repository.findByIdAndDelete(id).lean();
  }
}
