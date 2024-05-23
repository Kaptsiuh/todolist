export interface CssBaselineProps extends StyledComponentProps<never> {
  children?: React.ReactNode;
  enableColorScheme?: boolean;
}

export default function CssBaseline(props: CssBaselineProps): JSX.Element;
