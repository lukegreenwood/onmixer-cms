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
    case 'id':
      return ShowNumberFilterField.Id;
    default:
      return ShowNumberFilterField.Id;
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
