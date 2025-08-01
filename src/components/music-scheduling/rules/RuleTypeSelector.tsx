'use client';

import { formatRuleName, RuleType } from '../utils';

interface RuleTypeSelectorProps {
  value: RuleType | string;
  onChange: (value: RuleType) => void;
  disabled?: boolean;
}

export const RuleTypeSelector = ({ value, onChange, disabled = false }: RuleTypeSelectorProps) => {
  const ruleGroups = {
    'Separation Rules': [
      RuleType.PrimaryArtistSeparation,
      RuleType.SecondaryArtistSeparation,
      RuleType.RelatedArtistSeparation,
      RuleType.AudioItemSeparation,
      RuleType.TitleSeparation,
    ],
    'Rotation Rules': [
      RuleType.HourRotation,
      RuleType.DaypartRotation,
      RuleType.YesterdaySameHour,
    ],
    'Flow Rules': [
      RuleType.GenreFlow,
      RuleType.GenreAdjacent,
      RuleType.TempoFlow,
      RuleType.TempoAdjacent,
      RuleType.TagFlow,
      RuleType.TagAdjacent,
      RuleType.VocalGenderAdjacent,
      RuleType.CustomFieldFlow,
      RuleType.CustomFieldAdjacent,
    ],
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as RuleType);
  };

  return (
    <div className="rule-type-selector">
      <label className="form-label">Rule Type</label>
      <select
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="form-select"
      >
        <option value="">Select a rule type...</option>
        {Object.entries(ruleGroups).map(([group, rules]) => (
          <optgroup key={group} label={group}>
            {rules.map(rule => (
              <option key={rule} value={rule}>
                {formatRuleName(rule)}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};