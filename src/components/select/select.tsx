"use client";
import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";
import React, {
  ForwardedRef,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import { ChevronDown, ChevronUp } from "../../icons/chevron";
import styles from "./select.module.css";

export interface ISelectProps
  extends Omit<RadixSelect.SelectTriggerProps, "onChange"> {
  placeholder?: string;
  errorValidation?: boolean;
  errorMessage?: string;
  required?: boolean;
  value?: string;
  container?: HTMLElement;
  onChange?: (event: string) => void;
  onOpenChange?: (visible: boolean) => void;
  onClose?: () => void;
}

const _Select = React.forwardRef(
  (
    {
      children,
      placeholder,
      errorValidation = false,
      errorMessage,
      required,
      value,
      name,
      container,
      onClose,
      onChange,
      onOpenChange,
      ...props
    }: PropsWithChildren<ISelectProps>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = useCallback(
      (event: string) => {
        onChange?.(event);
      },
      [onChange]
    );

    const handleToggle = useCallback(
      (visible: boolean) => {
        setIsOpen(visible);
        onOpenChange?.(visible);
        if (!visible) {
          onClose?.();
        }
      },
      [onClose, onOpenChange, setIsOpen]
    );

    const actualValue = value || undefined;
    const isEmpty = actualValue == null || actualValue === "";
    const hasValidationErrors = !!errorMessage && required && isEmpty;
    const showValidationErrors = errorValidation && hasValidationErrors;

    return (
      <div className={styles.gridStyle}>
        <RadixSelect.Root
          open={isOpen}
          value={actualValue}
          onValueChange={handleChange}
          onOpenChange={handleToggle}
        >
          {showValidationErrors && (
            <label className={styles.errorLabelWrapper}>
              <div className={styles.errorLabelText}>{errorMessage}</div>
            </label>
          )}
          <RadixSelect.Trigger
            {...props}
            className={clsx(props.className, styles.trigger, {
              [styles.errorBorder]: hasValidationErrors,
            })}
            ref={ref}
          >
            <RadixSelect.Value
              className={styles.placeholderText}
              placeholder={required ? placeholder + " *" : placeholder}
            />

            <RadixSelect.Icon color="black">
              <ChevronDown height={16} width={16} />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>
          <RadixSelect.Portal container={container}>
            <RadixSelect.Content className={styles.content}>
              <RadixSelect.ScrollUpButton className={styles.scrollButtonStyles}>
                <ChevronUp height={16} width={16} />
              </RadixSelect.ScrollUpButton>
              <RadixSelect.Viewport className={styles.styledViewport}>
                {children}
              </RadixSelect.Viewport>
              <RadixSelect.ScrollDownButton
                className={styles.scrollButtonStyles}
              >
                <ChevronDown height={16} width={16} />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>
    );
  }
);

export interface ISelectItemProps {
  value: string;
  children?: React.ReactNode;
}

const SelectItem = React.forwardRef(
  (
    { children, ...props }: PropsWithChildren<ISelectItemProps>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <RadixSelect.Item {...props} className={styles.styledItem} ref={ref}>
        <RadixSelect.ItemText>
          <span>{children}</span>
        </RadixSelect.ItemText>
      </RadixSelect.Item>
    );
  }
);

export const Select = Object.assign(_Select, { Item: SelectItem });
