export interface Pagination {
  page?: number;
  limit: number;
}

export interface DTOMapper<
  DomainClass,
  DTO,
  SArgs = undefined,
  DSArgs = undefined,
> {
  serialize(domainObject: DomainClass, args?: SArgs): DTO;
  deserialize(dto: DTO, args?: DSArgs): DomainClass;
}
