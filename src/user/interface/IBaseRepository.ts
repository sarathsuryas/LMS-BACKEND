// src/user/interface/IBaseRepository.ts
import { Document, FilterQuery, PopulateOptions, UpdateQuery } from "mongoose";

export interface IBaseRepository<T extends Document> {
  findAll<R>(
    filter: any,
    skip?: number,
    limit?: number,
    sort?: any
  ): Promise<R[]>;

  findById<R>(
    id: string,
    projection?: Record<string, unknown>
  ): Promise<R | null>;

  findOneByQuery<R>(
    query: FilterQuery<T>
  ): Promise<R>;

  findOneWithProjection<R>(
    filter: Record<string, any>,
    projection: Record<string, number>
  ): Promise<R>;

  findOneAndUpdate(
    filter: Record<string, any>,
    update: Record<string, any>
  ): Promise<T | null>;

  find<R>(): Promise<R[]>;

  findByQuery<R>(
    query: FilterQuery<T>
  ): Promise<R[]>;

  create<R>(
    item: R
  ): Promise<T>;

  update(
    id: any,
    item: UpdateQuery<T>
  ): Promise<T | null>;

  delete(
    id: string
  ): Promise<boolean>;

  findWithPopulate<R>(
    filter: FilterQuery<T>,
    sort?: Record<string, 1 | -1>,
    populate?: string | PopulateOptions | (string | PopulateOptions)[],
    lean?: boolean
  ): Promise<R[]>;

  findWithSort<R>(
    filter?: Record<string, any>,
    sort?: Record<string, 1 | -1>,
    limit?: number,
    skip?: number,
    projection?: Record<string, 1 | 0>
  ): Promise<R[]>;
}
