export type ButtonVariant =
  | 'text'
  | 'flat'
  | 'raised'
  | 'outline'
  | 'link'
  | null;
export type ButtonColor =
  | null
  | 'primary'
  | 'danger'
  | 'positive'
  | 'paper'
  | 'chip'
  | 'white';

interface SharedButtonStyleProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  border?: string;
  shadow?: string;
  whitespace?: string;
  display?: string;
}
export function getSharedButtonStyle(
  props: SharedButtonStyleProps,
): (string | boolean | null | undefined)[] {
  const {
    variant,
    shadow,
    whitespace = 'whitespace-nowrap',
    display = 'inline-flex',
  } = props;
  const variantProps = {...props, border: props.border || 'border'};
  let style: string[] = [];
  if (variant === 'outline') {
    style = outline(variantProps);
  } else if (variant === 'text') {
    style = text(variantProps);
  } else if (variant === 'flat' || variant === 'raised') {
    style = contained(variantProps);
  } else if (variant === 'link') {
    style = link(variantProps);
  }

  return [
    ...style,
    shadow || (variant === 'raised' && 'shadow-md'),
    whitespace,
    display,
    variant &&
      'align-middle flex-shrink-0 items-center transition-button duration-200',
    'select-none appearance-none no-underline outline-none disabled:pointer-events-none disabled:cursor-default',
  ];
}

function outline({color, border}: SharedButtonStyleProps) {
  const disabled =
    'disabled:text-disabled disabled:bg-transparent disabled:border-disabled-bg';
  switch (color) {
    case 'primary':
      return [
        `text-black bg-primary ${border} border-primary/50`,
        'hover:bg-primary-dark hover:border-primary',
        disabled,
      ];
    case 'danger':
      return [
        `text-danger bg-transparent ${border} border-danger/50`,
        'hover:bg-danger/4 hover:border-danger',
        disabled,
      ];
    case 'positive':
      return [
        `text-positive bg-transparent ${border} border-positive/50`,
        'hover:bg-positive/4 hover:border-positive',
        disabled,
      ];
    case 'paper':
      return [`text bg-background ${border}`, 'hover:bg-hover', disabled];
    case 'white':
      return [
        'text-white bg-transparent border border-white',
        'hover:bg-white/20',
        'disabled:text-white/70 disabled:border-white/70 disabled:bg-transparent',
      ];
    default:
      return [`bg-transparent ${border}`, 'hover:bg-hover', disabled];
  }
}

function text({color}: SharedButtonStyleProps) {
  const disabled = 'disabled:text-disabled disabled:bg-transparent';
  switch (color) {
    case 'primary':
      return [
        'text-primary bg-transparent border-transparent',
        'hover:bg-primary/4',
        disabled,
      ];
    case 'danger':
      return [
        'text-danger bg-transparent border-transparent',
        'hover:bg-danger/4',
        disabled,
      ];
    case 'positive':
      return [
        'text-positive bg-transparent border-transparent',
        'hover:bg-positive/4',
        disabled,
      ];
    case 'white':
      return [
        'text-white bg-transparent border-transparent',
        'hover:bg-white/20',
        'disabled:text-white/70 disabled:bg-transparent',
      ];
    default:
      return ['bg-transparent border-transparent', 'hover:bg-hover', disabled];
  }
}

function link({color}: SharedButtonStyleProps) {
  switch (color) {
    case 'primary':
      return ['text-primary', 'hover:underline', 'disabled:text-disabled'];
    case 'danger':
      return ['text-danger', 'hover:underline', 'disabled:text-disabled'];
    default:
      return ['text-main', 'hover:underline', 'disabled:text-disabled'];
  }
}

function contained({color, border}: SharedButtonStyleProps) {
  const disabled =
    'disabled:text-disabled disabled:bg-disabled disabled:border-transparent disabled:shadow-none';
  switch (color) {
    case 'primary':
      return [
        `text-black bg-primary ${border} border-primary`,
        'hover:bg-primary-dark hover:border-primary-dark',
        disabled,
      ];
    case 'danger':
      return [
        `text-white bg-danger ${border} border-danger`,
        'hover:bg-danger/90 hover:border-danger/90',
        disabled,
      ];
    case 'chip':
      return [
        `text-main bg-chip ${border} border-chip`,
        'hover:bg-chip/90 hover:border-chip/90',
        disabled,
      ];
    case 'paper':
      return [
        `text-main bg-background ${border} border-paper`,
        'hover:bg-background/90 hover:border-paper/90',
        disabled,
      ];
    case 'white':
      return [
        `text-black bg-white ${border} border-white`,
        'hover:bg-white',
        disabled,
      ];
    default:
      return [`bg ${border} border-background`, 'hover:bg-hover', disabled];
  }
}
