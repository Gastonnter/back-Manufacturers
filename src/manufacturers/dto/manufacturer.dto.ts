import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// DTO para la respuesta original de la API NHTSA
export class VehicleTypeDto {
  @ApiPropertyOptional({
    description: 'Indica si este es el tipo de vehículo principal',
    example: true,
  })
  @IsOptional()
  IsPrimary: boolean;

  @ApiProperty({
    description: 'Nombre del tipo de vehículo',
    example: 'Passenger Car',
  })
  @IsString()
  Name: string;
}

export class NhtsaManufacturerDto {
  @IsString()
  Country: string;

  @IsString()
  Mfr_CommonName: string;

  @IsNumber()
  Mfr_ID: number;

  @IsString()
  Mfr_Name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleTypeDto)
  VehicleTypes?: VehicleTypeDto[];
}

export class NhtsaResponseDto {
  @IsNumber()
  Count: number;

  @IsString()
  Message: string;

  @IsString()
  SearchCriteria: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NhtsaManufacturerDto)
  Results: NhtsaManufacturerDto[];
}

// DTO para la respuesta transformada que devolvemos
export class ManufacturerDto {
  @ApiProperty({
    description: 'País del fabricante',
    example: 'UNITED STATES',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Nombre común del fabricante',
    example: 'Ford Motor Company',
  })
  @IsString()
  commonName: string;

  @ApiProperty({
    description: 'Nombre legal del fabricante',
    example: 'Ford Motor Company',
  })
  @IsString()
  legalName: string;

  @ApiPropertyOptional({
    description: 'Tipos de vehículos que fabrica',
    type: [VehicleTypeDto],
    example: [
      { IsPrimary: true, Name: 'Passenger Car' },
      { IsPrimary: false, Name: 'Truck' },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VehicleTypeDto)
  vehiclesType?: VehicleTypeDto[];
}

export class ManufacturersResponseDto {
  @ApiProperty({
    description: 'Número total de fabricantes encontrados',
    example: 525,
  })
  @IsNumber()
  count: number;

  @ApiProperty({
    description: 'Mensaje de estado de la respuesta',
    example: 'Manufacturers retrieved successfully',
  })
  @IsString()
  message: string;

  @ApiProperty({
    description: 'Lista de fabricantes',
    type: [ManufacturerDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ManufacturerDto)
  manufacturers: ManufacturerDto[];

  @ApiPropertyOptional({
    description: 'Información de paginación',
    example: {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 525,
      totalPages: 53,
    },
  })
  @IsOptional()
  pagination?: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}
