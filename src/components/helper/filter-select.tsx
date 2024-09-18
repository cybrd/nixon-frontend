import { useContext } from "solid-js";

import { FilterOptionsContext } from "../../context/filter-options";

import { FilterOptions } from "../../models/filter-options";
import { SetParamsAndOptions } from "./params";
import { useSearchParams } from "@solidjs/router";

import { RiArrowsArrowDownSLine, RiArrowsArrowLeftSLine } from "solid-icons/ri";
import { Combobox } from "@kobalte/core/combobox";

export const filterSelect = (
  setter: SetParamsAndOptions,
  key: keyof FilterOptions
) => {
  const [params] = useSearchParams();
  const filter = useContext(FilterOptionsContext);

  const options = filter.filterOptions()[key];
  const comboboxOptions = [
    { label: "----", value: "" },
    ...Object.entries(options).map(([k, v]) => ({
      label: v,
      value: k,
    })),
  ];
  const defaultValue = comboboxOptions.find((x) => params[key] === x.value);

  return (
    <div class="mb-3">
      <label for={key} class="form-label">
        {key}
      </label>
      <Combobox
        class="d-inline-block"
        options={comboboxOptions}
        optionValue="value"
        optionTextValue="label"
        optionLabel="label"
        name={key}
        placeholder={key}
        onChange={(e) => setter({ [key]: e?.value || "", page: "1" })}
        defaultValue={defaultValue}
        itemComponent={(props) => (
          <Combobox.Item item={props.item} class="combobox__item">
            <Combobox.ItemLabel>{props.item.rawValue.label}</Combobox.ItemLabel>
            <Combobox.ItemIndicator class="combobox__item-indicator">
              <RiArrowsArrowLeftSLine />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        )}
      >
        <Combobox.Control class="combobox__control" aria-label="Fruit">
          <Combobox.Input class="combobox__input" />
          <Combobox.Trigger class="combobox__trigger">
            <Combobox.Icon class="combobox__icon">
              <RiArrowsArrowDownSLine />
            </Combobox.Icon>
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class="combobox__content">
            <Combobox.Listbox class="combobox__listbox" />
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>
    </div>
  );
};
