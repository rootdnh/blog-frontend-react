import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
      themeName: string;
    
      colors: {
        primary: string
      }

  }
}