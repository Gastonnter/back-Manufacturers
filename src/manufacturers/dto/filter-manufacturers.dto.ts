import { IsOptional, IsString, IsIn, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterManufacturersDto {
  @ApiPropertyOptional({
    description: 'Filtrar por país del fabricante',
    example: 'UNITED STATES',
  })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por nombre común del fabricante',
    example: 'Ford',
  })
  @IsOptional()
  @IsString()
  commonName?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por nombre legal del fabricante',
    example: 'Ford Motor Company',
  })
  @IsOptional()
  @IsString()
  legalName?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por tipo de vehículo',
    example: 'Passenger Car',
  })
  @IsOptional()
  @IsString()
  vehicleType?: string;

  @ApiPropertyOptional({
    description: 'Búsqueda general en todos los campos',
    example: 'Ford',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Campo por el cual ordenar los resultados',
    enum: ['country', 'commonName', 'legalName'],
    example: 'commonName',
  })
  @IsOptional()
  @IsString()
  @IsIn(['country', 'commonName', 'legalName'], {
    message: 'sortBy must be one of: country, commonName, legalName',
  })
  sortBy?: 'country' | 'commonName' | 'legalName';

  @ApiPropertyOptional({
    description: 'Orden de los resultados',
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'], {
    message: 'sortOrder must be either asc or desc',
  })
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({
    description: 'Número de página para paginación (empieza en 1)',
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de elementos por página',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;
}
