import {FormChipField} from '@common/ui/forms/input-field/chip-field/form-chip-field';
import {Trans} from '@common/i18n/trans';
import React, {useState} from 'react';
import {useArtistPickerSuggestions} from '@app/web-player/artists/artist-picker/use-artist-picker-suggestions';
import {useTrans} from '@common/i18n/use-trans';
import {message} from '@common/i18n/message';
import {Item} from '@common/ui/forms/listbox/item';

interface FormArtistPickerProps {
  name: string;
  className?: string;
}
export function FormArtistPicker({name, className}: FormArtistPickerProps) {
  const {trans} = useTrans();
  const [inputValue, setInputValue] = useState('');
  const {data, isLoading} = useArtistPickerSuggestions({query: inputValue});

  return (
    <FormChipField
      className={className}
      name={name}
      label={<Trans message="Artists" />}
      isAsync
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      suggestions={data?.results}
      placeholder={trans(message('+Add artist'))}
      isLoading={isLoading}
      allowCustomValue={false}
    >
      {data?.results.map(result => (
        <Item
          value={result}
          key={result.id}
          startIcon={
            result.image ? (
              <img
                className="rounded-full object-cover w-24 h-24"
                src={result.image}
                alt=""
              />
            ) : undefined
          }
        >
          {result.name}
        </Item>
      ))}
    </FormChipField>
  );
}
