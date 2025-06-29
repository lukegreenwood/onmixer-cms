/**
 * Utility functions to map frontend filter operators to GraphQL input format
 * This provides a bridge between the frontend filter UI and the GraphQL rich filtering system
 */

import {
  DateFilterOperator,
  FilterModel,
  FiltersState,
  MultiOptionFilterOperator,
  NumberFilterOperator,
  OptionFilterOperator,
  TextFilterOperator,
  BooleanFilterOperator,
} from '@/components/blocks/DataTableFilter/core/types';

import {
  ShowFilterGroup,
  ShowFilterInput,
  ShowFilterType,
  OperatorType,
  TextFilterOperator as GqlTextFilterOperator,
  NumberFilterOperator as GqlNumberFilterOperator,
  DateFilterOperator as GqlDateFilterOperator,
  OptionFilterOperator as GqOptionFilterOperator,
  BooleanFilterOperator as GqlBooleanFilterOperator,
  MultiOptionFilterOperator as GqlMultiOptionFilterOperator,
  ShowListInputV2,
  ShowTextFilterField,
  ShowNumberFilterField,
  ShowDateFilterField,
  ShowBooleanFilterField,
  ShowMultiOptionFilterField,
  ShowOptionFilterField,
  // Episode types
  EpisodeFilterInput,
  EpisodeFilterType,
  EpisodeListInputV2,
  EpisodeTextFilterField,
  EpisodeNumberFilterField,
  EpisodeDateFilterField,
  EpisodeBooleanFilterField,
  EpisodeMultiOptionFilterField,
  EpisodeOptionFilterField,
  // Series types
  SeriesFilterInput,
  SeriesFilterType,
  SeriesListInputV2,
  SeriesTextFilterField,
  SeriesNumberFilterField,
  SeriesDateFilterField,
  SeriesBooleanFilterField,
  SeriesMultiOptionFilterField,
  SeriesOptionFilterField,
} from '../graphql/__generated__/graphql';

// Mapping functions
export const mapTextOperator = (
  operator: TextFilterOperator,
): GqlTextFilterOperator => {
  switch (operator) {
    case 'contains':
      return GqlTextFilterOperator.Contains;
    case 'does not contain':
      return GqlTextFilterOperator.DoesNotContain;
    default:
      return GqlTextFilterOperator.Contains;
  }
};

export const mapNumberOperator = (
  operator: NumberFilterOperator,
): GqlNumberFilterOperator => {
  switch (operator) {
    case 'is':
      return GqlNumberFilterOperator.Is;
    case 'is not':
      return GqlNumberFilterOperator.IsNot;
    case 'is less than':
      return GqlNumberFilterOperator.IsLessThan;
    case 'is greater than or equal to':
      return GqlNumberFilterOperator.IsGreaterThanOrEqualTo;
    case 'is greater than':
      return GqlNumberFilterOperator.IsGreaterThan;
    case 'is less than or equal to':
      return GqlNumberFilterOperator.IsLessThanOrEqualTo;
    case 'is between':
      return GqlNumberFilterOperator.IsBetween;
    case 'is not between':
      return GqlNumberFilterOperator.IsNotBetween;
    default:
      return GqlNumberFilterOperator.Is;
  }
};

export const mapDateOperator = (
  operator: DateFilterOperator,
): GqlDateFilterOperator => {
  switch (operator) {
    case 'is':
      return GqlDateFilterOperator.Is;
    case 'is not':
      return GqlDateFilterOperator.IsNot;
    case 'is before':
      return GqlDateFilterOperator.IsBefore;
    case 'is on or after':
      return GqlDateFilterOperator.IsOnOrAfter;
    case 'is after':
      return GqlDateFilterOperator.IsAfter;
    case 'is on or before':
      return GqlDateFilterOperator.IsOnOrBefore;
    case 'is between':
      return GqlDateFilterOperator.IsBetween;
    case 'is not between':
      return GqlDateFilterOperator.IsNotBetween;
    default:
      return GqlDateFilterOperator.Is;
  }
};

export const mapOptionOperator = (
  operator: OptionFilterOperator,
): GqOptionFilterOperator => {
  switch (operator) {
    case 'is':
      return GqOptionFilterOperator.Is;
    case 'is not':
      return GqOptionFilterOperator.IsNot;
    case 'is any of':
      return GqOptionFilterOperator.IsAnyOf;
    case 'is none of':
      return GqOptionFilterOperator.IsNoneOf;
    default:
      return GqOptionFilterOperator.Is;
  }
};

export const mapMultiOptionOperator = (
  operator: MultiOptionFilterOperator,
): GqlMultiOptionFilterOperator => {
  switch (operator) {
    case 'include':
    case 'include any of':
      return GqlMultiOptionFilterOperator.IncludeAnyOf;
    case 'exclude':
    case 'exclude if any of':
      return GqlMultiOptionFilterOperator.ExcludeIfAnyOf;
    case 'include all of':
      return GqlMultiOptionFilterOperator.IncludeAllOf;
    case 'exclude if all':
      return GqlMultiOptionFilterOperator.ExcludeIfAllOf;
    default:
      return GqlMultiOptionFilterOperator.IncludeAnyOf;
  }
};

export const mapBooleanOperator = (
  operator: BooleanFilterOperator,
): GqlBooleanFilterOperator => {
  switch (operator) {
    case 'is':
      return GqlBooleanFilterOperator.Is;
    case 'is not':
      return GqlBooleanFilterOperator.IsNot;
    default:
      return GqlBooleanFilterOperator.Is;
  }
};
// Field type mapping
export const getFieldType = (field: string): ShowFilterType => {
  const textFields = [
    'fullName',
    'shortName',
    'shortId',
    'shortDesc',
    'fullDesc',
    'extraData',
  ];
  const numberFields = ['id'];
  const dateFields = ['createdAt', 'updatedAt'];
  const booleanFields = ['hidden'];
  const multiOptionFields = ['presenters', 'networks'];

  if (textFields.includes(field)) return ShowFilterType.Text;
  if (numberFields.includes(field)) return ShowFilterType.Number;
  if (dateFields.includes(field)) return ShowFilterType.Date;
  if (booleanFields.includes(field)) return ShowFilterType.Boolean;
  if (multiOptionFields.includes(field)) return ShowFilterType.MultiOption;

  // Default to text for unknown fields
  return ShowFilterType.Text;
};

// Field mapping functions
const mapToTextField = (field: string): ShowTextFilterField => {
  switch (field) {
    case 'fullName':
      return ShowTextFilterField.FullName;
    case 'shortName':
      return ShowTextFilterField.ShortName;
    case 'shortId':
      return ShowTextFilterField.ShortId;
    case 'shortDesc':
      return ShowTextFilterField.ShortDesc;
    case 'fullDesc':
      return ShowTextFilterField.FullDesc;
    case 'extraData':
      return ShowTextFilterField.ExtraData;
    default:
      return ShowTextFilterField.ShortName;
  }
};

const mapToNumberField = (field: string): ShowNumberFilterField => {
  switch (field) {
    default:
      return ShowNumberFilterField.NoFieldsAvailable;
  }
};

const mapToDateField = (field: string): ShowDateFilterField => {
  switch (field) {
    case 'createdAt':
      return ShowDateFilterField.CreatedAt;
    case 'updatedAt':
      return ShowDateFilterField.UpdatedAt;
    default:
      return ShowDateFilterField.CreatedAt;
  }
};

const mapToBooleanField = (field: string): ShowBooleanFilterField => {
  switch (field) {
    case 'hidden':
      return ShowBooleanFilterField.Hidden;
    default:
      return ShowBooleanFilterField.Hidden;
  }
};

const mapToMultiOptionField = (field: string): ShowMultiOptionFilterField => {
  switch (field) {
    case 'presenters':
      return ShowMultiOptionFilterField.Presenters;
    case 'networks':
      return ShowMultiOptionFilterField.Networks;
    default:
      return ShowMultiOptionFilterField.Networks;
  }
};

const mapToOptionField = (field: string): ShowOptionFilterField => {
  switch (field) {
    case 'id':
      return ShowOptionFilterField.Id;
    default:
      return ShowOptionFilterField.Id;
  }
};
// Main mapping function for individual filters
export const mapFilterModelToGraphQL = (
  filterModel: FilterModel,
): ShowFilterInput => {
  const type = getFieldType(filterModel.columnId);

  const filter: ShowFilterInput = {
    type,
    textFilter: undefined,
    numberFilter: undefined,
    dateFilter: undefined,
    booleanFilter: undefined,
    optionFilter: undefined,
    multiOptionFilter: undefined,
  };

  switch (type) {
    case ShowFilterType.Text:
      if (filterModel.type === 'text') {
        if (filterModel.columnId === 'id') {
          filter.optionFilter = {
            field: mapToOptionField('id'),
            operator: mapOptionOperator(filterModel.operator),
            value: filterModel.values[0] as string,
            values:
              filterModel.values[0]?.split(',').length > 0
                ? filterModel.values[0]?.split(',')
                : (filterModel.values as string[]),
          };
          break;
        }
        filter.textFilter = {
          field: mapToTextField(filterModel.columnId),
          operator: mapTextOperator(filterModel.operator),
          value: String(filterModel.values[0] || ''),
        };
      }
      break;

    case ShowFilterType.Number:
      if (filterModel.type === 'number') {
        filter.numberFilter = {
          field: mapToNumberField(filterModel.columnId),
          operator: mapNumberOperator(filterModel.operator),
          value: filterModel.values[0] as number,
          values: filterModel.values as number[],
        };
      }
      break;

    case ShowFilterType.Date:
      if (filterModel.type === 'date') {
        filter.dateFilter = {
          field: mapToDateField(filterModel.columnId),
          operator: mapDateOperator(filterModel.operator),
          value: (filterModel.values[0] as Date)?.toISOString(),
          values: (filterModel.values as Date[])?.map((date) =>
            date.toISOString(),
          ),
        };
      }
      break;

    case ShowFilterType.Boolean:
      if (filterModel.columnId === 'hidden') {
        const isHidden = filterModel.values[0] === true;

        filter.booleanFilter = {
          field: mapToBooleanField('hidden'),
          operator: mapBooleanOperator(filterModel.operator),
          value: isHidden,
        };
      }
      break;
    case ShowFilterType.MultiOption:
      if (filterModel.type === 'multiOption') {
        filter.multiOptionFilter = {
          field: mapToMultiOptionField(filterModel.columnId),
          operator: mapMultiOptionOperator(filterModel.operator),
          values: filterModel.values as string[],
        };
      }
      break;
  }

  return filter;
};

// Convert FiltersState to ShowListInputV2
export const convertFiltersStateToGraphQL = (
  filtersState: FiltersState,
  options?: {
    includeHidden?: boolean;
    limit?: number;
    offset?: number;
  },
): ShowListInputV2 => {
  // Convert all filters
  const filters = filtersState.map(mapFilterModelToGraphQL);

  // Create the filter group with AND operator by default
  const filterGroup: ShowFilterGroup = {
    operator: OperatorType.And,
    filters,
    groups: undefined,
  };

  return {
    filterGroup: filters.length > 0 ? filterGroup : undefined,
    limit: options?.limit,
    offset: options?.offset,
    order: undefined,
  };
};

// Episode field type mapping
export const getEpisodeFieldType = (field: string): EpisodeFilterType => {
  const textFields = ['name', 'shortId', 'description', 'extraData'];
  const numberFields = ['id', 'duration'];
  const dateFields = ['createdAt', 'updatedAt'];
  const booleanFields = ['hasSeries'];
  const multiOptionFields = ['presenters', 'networks', 'shows'];
  const optionFields = ['series', 'show'];

  if (textFields.includes(field)) return EpisodeFilterType.Text;
  if (numberFields.includes(field)) return EpisodeFilterType.Number;
  if (dateFields.includes(field)) return EpisodeFilterType.Date;
  if (booleanFields.includes(field)) return EpisodeFilterType.Boolean;
  if (multiOptionFields.includes(field)) return EpisodeFilterType.MultiOption;
  if (optionFields.includes(field)) return EpisodeFilterType.Option;

  // Default to text for unknown fields
  return EpisodeFilterType.Text;
};

// Episode field mapping functions
const mapToEpisodeTextField = (field: string): EpisodeTextFilterField => {
  switch (field) {
    case 'name':
      return EpisodeTextFilterField.Name;
    case 'shortId':
      return EpisodeTextFilterField.ShortId;
    case 'description':
      return EpisodeTextFilterField.Description;
    case 'extraData':
      return EpisodeTextFilterField.ExtraData;
    default:
      return EpisodeTextFilterField.Name;
  }
};

const mapToEpisodeNumberField = (field: string): EpisodeNumberFilterField => {
  switch (field) {
    case 'duration':
      return EpisodeNumberFilterField.Duration;
    default:
      return EpisodeNumberFilterField.Duration;
  }
};

const mapToEpisodeDateField = (field: string): EpisodeDateFilterField => {
  switch (field) {
    case 'createdAt':
      return EpisodeDateFilterField.CreatedAt;
    case 'updatedAt':
      return EpisodeDateFilterField.UpdatedAt;
    default:
      return EpisodeDateFilterField.CreatedAt;
  }
};

const mapToEpisodeBooleanField = (field: string): EpisodeBooleanFilterField => {
  switch (field) {
    case 'hasSeries':
      return EpisodeBooleanFilterField.HasSeries;
    default:
      return EpisodeBooleanFilterField.HasSeries;
  }
};

const mapToEpisodeMultiOptionField = (
  field: string,
): EpisodeMultiOptionFilterField => {
  switch (field) {
    case 'presenters':
      return EpisodeMultiOptionFilterField.Presenters;
    case 'networks':
      return EpisodeMultiOptionFilterField.Networks;
    case 'shows':
      return EpisodeMultiOptionFilterField.Shows;
    default:
      return EpisodeMultiOptionFilterField.Networks;
  }
};

const mapToEpisodeOptionField = (field: string): EpisodeOptionFilterField => {
  switch (field) {
    case 'id':
      return EpisodeOptionFilterField.Id;
    case 'series':
      return EpisodeOptionFilterField.Series;
    case 'show':
      return EpisodeOptionFilterField.Show;
    default:
      return EpisodeOptionFilterField.Id;
  }
};

// Main mapping function for individual episode filters
export const mapFilterModelToEpisodeGraphQL = (
  filterModel: FilterModel,
): EpisodeFilterInput => {
  const type = getEpisodeFieldType(filterModel.columnId);

  const filter: EpisodeFilterInput = {
    type,
    textFilter: undefined,
    numberFilter: undefined,
    dateFilter: undefined,
    booleanFilter: undefined,
    optionFilter: undefined,
    multiOptionFilter: undefined,
  };

  switch (type) {
    case EpisodeFilterType.Text:
      if (filterModel.type === 'text') {
        if (filterModel.columnId === 'id') {
          filter.optionFilter = {
            field: mapToEpisodeOptionField('id'),
            operator: mapOptionOperator(filterModel.operator),
            value: filterModel.values[0] as string,
            values:
              filterModel.values[0]?.split(',').length > 0
                ? filterModel.values[0]?.split(',')
                : (filterModel.values as string[]),
          };
          break;
        }
        filter.textFilter = {
          field: mapToEpisodeTextField(filterModel.columnId),
          operator: mapTextOperator(filterModel.operator),
          value: String(filterModel.values[0] || ''),
        };
      }
      break;

    case EpisodeFilterType.Number:
      if (filterModel.type === 'number') {
        filter.numberFilter = {
          field: mapToEpisodeNumberField(filterModel.columnId),
          operator: mapNumberOperator(filterModel.operator),
          value: filterModel.values[0] as number,
          values: filterModel.values as number[],
        };
      }
      break;

    case EpisodeFilterType.Date:
      if (filterModel.type === 'date') {
        filter.dateFilter = {
          field: mapToEpisodeDateField(filterModel.columnId),
          operator: mapDateOperator(filterModel.operator),
          value: (filterModel.values[0] as Date)?.toISOString(),
          values: (filterModel.values as Date[])?.map((date) =>
            date.toISOString(),
          ),
        };
      }
      break;

    case EpisodeFilterType.Boolean:
      if (filterModel.type === 'boolean') {
        filter.booleanFilter = {
          field: mapToEpisodeBooleanField(filterModel.columnId),
          operator: mapBooleanOperator(filterModel.operator),
          value: filterModel.values[0] as boolean,
        };
      }
      break;

    case EpisodeFilterType.MultiOption:
      if (filterModel.type === 'multiOption') {
        filter.multiOptionFilter = {
          field: mapToEpisodeMultiOptionField(filterModel.columnId),
          operator: mapMultiOptionOperator(filterModel.operator),
          values: filterModel.values as string[],
        };
      }
      break;

    case EpisodeFilterType.Option:
      if (filterModel.type === 'option' || filterModel.type === 'multiOption') {
        filter.optionFilter = {
          field: mapToEpisodeOptionField(filterModel.columnId),
          operator: mapOptionOperator(filterModel.operator),
          value: filterModel.values[0] as string,
          values: filterModel.values as string[],
        };
      }
      break;
  }

  return filter;
};

// Convert FiltersState to EpisodeListInputV2
export const convertFiltersStateToEpisodeGraphQL = (
  filtersState: FiltersState,
  options?: {
    limit?: number;
    offset?: number;
  },
): EpisodeListInputV2 => {
  if (filtersState.length === 0) {
    return {
      limit: options?.limit,
      offset: options?.offset,
    };
  }

  const filters = filtersState.map((filter) =>
    mapFilterModelToEpisodeGraphQL(filter),
  );

  return {
    filterGroup: {
      operator: OperatorType.And,
      filters,
    },
    limit: options?.limit,
    offset: options?.offset,
  };
};

// Series filter functions
export const getSeriesFieldType = (field: string): SeriesFilterType => {
  const textFields = [
    'fullName',
    'shortName',
    'shortId',
    'shortDesc',
    'fullDesc',
  ];
  const numberFields = ['id'];
  const dateFields = ['createdAt', 'updatedAt'];
  const booleanFields = ['archived'];
  const multiOptionFields = ['networks', 'shows'];
  const optionFields = ['network', 'show'];

  if (textFields.includes(field)) return SeriesFilterType.Text;
  if (numberFields.includes(field)) return SeriesFilterType.Number;
  if (dateFields.includes(field)) return SeriesFilterType.Date;
  if (booleanFields.includes(field)) return SeriesFilterType.Boolean;
  if (multiOptionFields.includes(field)) return SeriesFilterType.MultiOption;
  if (optionFields.includes(field)) return SeriesFilterType.Option;

  // Default to text for unknown fields
  return SeriesFilterType.Text;
};

// Field mapping functions for Series
const mapToSeriesTextField = (field: string): SeriesTextFilterField => {
  switch (field) {
    case 'fullName':
      return SeriesTextFilterField.FullName;
    case 'shortName':
      return SeriesTextFilterField.ShortName;
    case 'shortId':
      return SeriesTextFilterField.ShortId;
    case 'shortDesc':
      return SeriesTextFilterField.ShortDesc;
    case 'fullDesc':
      return SeriesTextFilterField.FullDesc;
    default:
      return SeriesTextFilterField.ShortName;
  }
};

const mapToSeriesNumberField = (_field: string): SeriesNumberFilterField => {
  // Series has no available number fields in the schema
  return SeriesNumberFilterField.NoFieldsAvailable;
};

const mapToSeriesDateField = (field: string): SeriesDateFilterField => {
  switch (field) {
    case 'createdAt':
      return SeriesDateFilterField.CreatedAt;
    case 'updatedAt':
      return SeriesDateFilterField.UpdatedAt;
    default:
      return SeriesDateFilterField.CreatedAt;
  }
};

const mapToSeriesBooleanField = (field: string): SeriesBooleanFilterField => {
  switch (field) {
    case 'archived':
      return SeriesBooleanFilterField.Archived;
    default:
      return SeriesBooleanFilterField.Archived;
  }
};

const mapToSeriesMultiOptionField = (
  field: string,
): SeriesMultiOptionFilterField => {
  switch (field) {
    case 'networks':
      return SeriesMultiOptionFilterField.Networks;
    case 'shows':
      return SeriesMultiOptionFilterField.Shows;
    default:
      return SeriesMultiOptionFilterField.Networks;
  }
};

const mapToSeriesOptionField = (field: string): SeriesOptionFilterField => {
  switch (field) {
    case 'id':
      return SeriesOptionFilterField.Id;
    case 'archived':
      return SeriesOptionFilterField.Archived;
    case 'network':
      return SeriesOptionFilterField.Network;
    case 'show':
      return SeriesOptionFilterField.Show;
    default:
      return SeriesOptionFilterField.Id;
  }
};

export const mapFilterModelToSeriesGraphQL = (
  filterModel: FilterModel,
): SeriesFilterInput => {
  const fieldType = getSeriesFieldType(filterModel.columnId);

  switch (fieldType) {
    case SeriesFilterType.Text:
      return {
        type: SeriesFilterType.Text,
        textFilter: {
          field: mapToSeriesTextField(filterModel.columnId),
          operator: mapTextOperator(filterModel.operator as TextFilterOperator),
          value: filterModel.values[0] as string,
        },
      };

    case SeriesFilterType.Number:
      const numOperator = mapNumberOperator(
        filterModel.operator as NumberFilterOperator,
      );
      const isRangeOperator = [
        GqlNumberFilterOperator.IsBetween,
        GqlNumberFilterOperator.IsNotBetween,
      ].includes(numOperator);

      return {
        type: SeriesFilterType.Number,
        numberFilter: {
          field: mapToSeriesNumberField(filterModel.columnId),
          operator: numOperator,
          ...(isRangeOperator
            ? {
                values: filterModel.values.map((v) =>
                  parseInt(v as string, 10),
                ),
              }
            : { value: parseInt(filterModel.values[0] as string, 10) }),
        },
      };

    case SeriesFilterType.Date:
      const dateOperator = mapDateOperator(
        filterModel.operator as DateFilterOperator,
      );
      const isDateRangeOperator = [
        GqlDateFilterOperator.IsBetween,
        GqlDateFilterOperator.IsNotBetween,
      ].includes(dateOperator);

      return {
        type: SeriesFilterType.Date,
        dateFilter: {
          field: mapToSeriesDateField(filterModel.columnId),
          operator: dateOperator,
          ...(isDateRangeOperator
            ? { values: filterModel.values as string[] }
            : { value: filterModel.values[0] as string }),
        },
      };

    case SeriesFilterType.Boolean:
      return {
        type: SeriesFilterType.Boolean,
        booleanFilter: {
          field: mapToSeriesBooleanField(filterModel.columnId),
          operator: mapBooleanOperator(
            filterModel.operator as BooleanFilterOperator,
          ),
          value: filterModel.values[0] as boolean,
        },
      };

    case SeriesFilterType.MultiOption:
      return {
        type: SeriesFilterType.MultiOption,
        multiOptionFilter: {
          field: mapToSeriesMultiOptionField(filterModel.columnId),
          operator: mapMultiOptionOperator(
            filterModel.operator as MultiOptionFilterOperator,
          ),
          values: filterModel.values as string[],
        },
      };

    case SeriesFilterType.Option:
      const optOperator = mapOptionOperator(
        filterModel.operator as OptionFilterOperator,
      );
      const isOptionMultiValue = [
        GqOptionFilterOperator.IsAnyOf,
        GqOptionFilterOperator.IsNoneOf,
      ].includes(optOperator);

      return {
        type: SeriesFilterType.Option,
        optionFilter: {
          field: mapToSeriesOptionField(filterModel.columnId),
          operator: optOperator,
          ...(isOptionMultiValue
            ? { values: filterModel.values as string[] }
            : { value: filterModel.values[0] as string }),
        },
      };

    default:
      throw new Error(`Unsupported filter type: ${fieldType}`);
  }
};

export const convertFiltersStateToSeriesGraphQL = (
  filtersState: FiltersState,
  options?: {
    includeArchived?: boolean;
    limit?: number;
    offset?: number;
  },
): SeriesListInputV2 => {
  if (filtersState.length === 0) {
    return {
      includeArchived: options?.includeArchived,
      limit: options?.limit,
      offset: options?.offset,
    };
  }

  const filters = filtersState.map((filter) =>
    mapFilterModelToSeriesGraphQL(filter),
  );

  return {
    filterGroup: {
      operator: OperatorType.And,
      filters,
    },
    includeArchived: options?.includeArchived,
    limit: options?.limit,
    offset: options?.offset,
  };
};
