import { ManufacturerDto } from '../dto/manufacturer.dto';
import { FilterManufacturersDto } from '../dto/filter-manufacturers.dto';

export class ManufacturerFilterService {
  static filterManufacturers(
    manufacturers: ManufacturerDto[],
    filters: FilterManufacturersDto,
  ): ManufacturerDto[] {
    let filteredResults = [...manufacturers];

    // Apply country filter
    if (filters.country) {
      filteredResults = filteredResults.filter((manufacturer) =>
        manufacturer.country
          ?.toLowerCase()
          .includes(filters.country!.toLowerCase()),
      );
    }

    // Apply common name filter
    if (filters.commonName) {
      filteredResults = filteredResults.filter((manufacturer) =>
        manufacturer.commonName
          ?.toLowerCase()
          .includes(filters.commonName!.toLowerCase()),
      );
    }

    // Apply legal name filter
    if (filters.legalName) {
      filteredResults = filteredResults.filter((manufacturer) =>
        manufacturer.legalName
          ?.toLowerCase()
          .includes(filters.legalName!.toLowerCase()),
      );
    }

    // Apply vehicle type filter
    if (filters.vehicleType) {
      filteredResults = filteredResults.filter((manufacturer) =>
        manufacturer.vehiclesType?.some((vehicleType) =>
          vehicleType.Name?.toLowerCase().includes(
            filters.vehicleType!.toLowerCase(),
          ),
        ),
      );
    }

    // Apply general search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredResults = filteredResults.filter(
        (manufacturer) =>
          manufacturer.country?.toLowerCase().includes(searchTerm) ||
          manufacturer.commonName?.toLowerCase().includes(searchTerm) ||
          manufacturer.legalName?.toLowerCase().includes(searchTerm) ||
          manufacturer.vehiclesType?.some((vehicleType) =>
            vehicleType.Name?.toLowerCase().includes(searchTerm),
          ),
      );
    }

    return filteredResults;
  }

  static sortManufacturers(
    manufacturers: ManufacturerDto[],
    sortBy?: string,
    sortOrder: 'asc' | 'desc' = 'asc',
  ): ManufacturerDto[] {
    if (!sortBy) return manufacturers;

    const sortedResults = [...manufacturers].sort((firstItem, secondItem) => {
      let firstValue = '';
      let secondValue = '';

      switch (sortBy) {
        case 'country':
          firstValue = firstItem.country || '';
          secondValue = secondItem.country || '';
          break;
        case 'commonName':
          firstValue = firstItem.commonName || '';
          secondValue = secondItem.commonName || '';
          break;
        case 'legalName':
          firstValue = firstItem.legalName || '';
          secondValue = secondItem.legalName || '';
          break;
        default:
          return 0;
      }

      const comparisonResult = firstValue.localeCompare(secondValue);
      return sortOrder === 'desc' ? -comparisonResult : comparisonResult;
    });

    return sortedResults;
  }

  static paginateResults(
    manufacturers: ManufacturerDto[],
    page: number = 1,
    limit: number = 10,
  ): {
    data: ManufacturerDto[];
    pagination: {
      currentPage: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  } {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = manufacturers.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems: manufacturers.length,
        totalPages: Math.ceil(manufacturers.length / limit),
      },
    };
  }
}
