import { createContext, useContext, useState } from "react";
import { IThemeContext, IThemeProvider } from "../../types/themeprovider.types";
import { DefaultTheme } from "styled-components/dist/types";
import dark from "../../layout/themes/dark";
import light from "../../layout/themes/light";
import { ThemeProvider } from "styled-components";

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

export function ThemesProvider({children}: IThemeProvider){
  const [theme, setTheme] = useState<DefaultTheme>(light);

  const toggleTheme = () =>{
    setTheme((currentTheme)=>{
      if(currentTheme.themeName === "light"){
        return dark;
      }
      return light;
    })
  }
  return (
    <ThemeContext.Provider value={{toggleTheme}}>
       <ThemeProvider theme={theme}>
        {children}
       </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemesProvider(){
  const context = useContext(ThemeContext);
  return context;
}