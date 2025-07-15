import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import {
  ManufacturersResponseDto,
  NhtsaResponseDto,
  ManufacturerDto,
} from './dto/manufacturer.dto';
import { FilterManufacturersDto } from './dto/filter-manufacturers.dto';
import { ManufacturerFilterService } from './utils/manufacturer-filter.service';

@Injectable()
export class ManufacturersService {
  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  async getAllManufacturers(): Promise<ManufacturersResponseDto> {
    try {
      const response: AxiosResponse<NhtsaResponseDto> = await axios.get(
        `${this.baseUrl}/getallmanufacturers?format=json`,
      );

      const nhtsaData = response.data;
      const transformedManufacturers: ManufacturerDto[] = nhtsaData.Results.map(
        (manufacturer) => ({
          country: manufacturer.Country,
          commonName: manufacturer.Mfr_CommonName,
          legalName: manufacturer.Mfr_Name,
          vehiclesType: manufacturer.VehicleTypes,
        }),
      );

      return {
        count: nhtsaData.Count,
        message: nhtsaData.Message,
        manufacturers: transformedManufacturers,
      };
    } catch (error) {
      console.error('Error fetching manufacturers:', error);
      throw new HttpException(
        'Error fetching manufacturers from NHTSA API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFilteredManufacturers(
    filters: FilterManufacturersDto,
  ): Promise<ManufacturersResponseDto> {
    try {
      // Obtener todos los fabricantes primero
      const response = await this.getAllManufacturers();

      // Aplicar filtros usando el servicio
      const filteredManufacturers =
        ManufacturerFilterService.filterManufacturers(
          response.manufacturers,
          filters,
        );

      // Aplicar ordenamiento usando el servicio
      const sortedManufacturers = ManufacturerFilterService.sortManufacturers(
        filteredManufacturers,
        filters.sortBy,
        filters.sortOrder,
      );

      // Aplicar paginación usando el servicio
      const paginationResult = ManufacturerFilterService.paginateResults(
        sortedManufacturers,
        filters.page || 1,
        filters.limit || 10,
      );

      return {
        count: filteredManufacturers.length,
        message: response.message,
        manufacturers: paginationResult.data,
        pagination: paginationResult.pagination,
      };
    } catch (error) {
      console.error('Error filtering manufacturers:', error);
      throw new HttpException(
        'Error filtering manufacturers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getManufacturersByCountry(
    country: string,
  ): Promise<ManufacturersResponseDto> {
    try {
      const response: AxiosResponse<NhtsaResponseDto> = await axios.get(
        `${this.baseUrl}/getallmanufacturers?format=json&country=${encodeURIComponent(country)}`,
      );

      const nhtsaData = response.data;
      const transformedManufacturers: ManufacturerDto[] = nhtsaData.Results.map(
        (manufacturer) => ({
          country: manufacturer.Country,
          commonName: manufacturer.Mfr_CommonName,
          legalName: manufacturer.Mfr_Name,
          vehiclesType: manufacturer.VehicleTypes,
        }),
      );

      return {
        count: nhtsaData.Count,
        message: nhtsaData.Message,
        manufacturers: transformedManufacturers,
      };
    } catch (error) {
      console.error('Error fetching manufacturers by country:', error);
      throw new HttpException(
        'Error fetching manufacturers by country from NHTSA API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
