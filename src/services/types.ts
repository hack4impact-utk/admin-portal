export interface IFetchService<TCreateRequest, TUpdateRequest, TResponse> {
  create(createData: TCreateRequest): Promise<TResponse>;
  get(id: string): Promise<TResponse>;
  getAll(): Promise<TResponse[]>;
  update(id: string, updateData: TUpdateRequest): Promise<TResponse>;
  delete(id: string): Promise<void>;
}
