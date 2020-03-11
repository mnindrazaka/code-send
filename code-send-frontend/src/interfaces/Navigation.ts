import { ReactNode, FunctionComponent } from "react";

export interface NavigationRoute {
  path: string;
  component: FunctionComponent;
}

export interface NavigationMenuItem extends NavigationRoute {
  title: string;
  icon: ReactNode;
}
