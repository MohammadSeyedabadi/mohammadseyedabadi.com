"use client";

import { createContext, useState, useEffect } from "react";
import {useRouter, usePathname } from "@/i18n/routing";

const PreferencesContext = createContext();

export function PreferencesContextProvider(props) {
  // false = dark mode because of the way I wrote the CSS
  const [active, setActive] = useState(false);
  // the opposite, for screenreaders
  const [ariaActive, setAriaActive] = useState(true);
  const [systemState, setsystemState] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const [otherPageSlug, setOtherPageSlug] = useState("");

  function handleKeypress(e) {
    if (e.code === "Enter") {
      changeTheme();
    }
  }

  function changeTheme() {
    // :root meaning html
    let dataTheme = document.querySelector(":root").getAttribute("data-theme");
    if (dataTheme === "dark") {
      setLightTheme();
    } else if (dataTheme === "light") {
      setDarkTheme();
    }
  }

  function setDarkTheme() {
    localStorage.setItem("theme", "dark");
    setThemeDatails("dark");
    setsystemState(false);
  }

  function setLightTheme() {
    localStorage.setItem("theme", "light");
    setThemeDatails("light");
    setsystemState(false);
  }

  function setSystemTheme() {
    let prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)");
    localStorage.setItem("theme", "system-theme");
    if (prefersLightTheme.matches) {
      setThemeDatails("light", true);
    } else {
      setThemeDatails("dark", true);
    }
    setsystemState(true);
  }

  function setThemeDatails(theme, SystemTheme) {
    if (SystemTheme === undefined) {
      if (theme === "dark") {
        setActive(false);
        setAriaActive(true);

        document
          .querySelector(":root")
          .setAttribute("data-theme", "dark");
      } else if (theme === "light") {
        setActive(true);
        setAriaActive(false);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "light");
      }
    } else if (SystemTheme === true) {
      if (theme === "dark") {
        setActive(false);
        setAriaActive(true);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "dark");
      } else if (theme === "light") {
        setActive(true);
        setAriaActive(false);
        document
          .querySelector(":root")
          .setAttribute("data-theme", "light");
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setDarkTheme();
    } else if (localStorage.getItem("theme") === "light") {
      setLightTheme();
    } else {
      setSystemTheme();
    }

    window
      .matchMedia("(prefers-color-scheme: light)")
      .addEventListener("change", () => {
        if (localStorage.getItem("theme") === "system-theme") {
          setSystemTheme();
        }
      });

    window.addEventListener("storage", (event) => {
      if (event.storageArea.theme === "dark") {
        setDarkTheme();
      } else if (event.storageArea.theme === "light") {
        setLightTheme();
      } else {
        setSystemTheme();
      }
    });
  });

  function changeLang(L, params) {
    if (params.slug || params.tag) { // each single tag there might be error. fix >>>> otherPageSlug && (params.slug || params.tag)
      if (params.tag) {
        router.replace(
          { pathname, params: { tag: otherPageSlug } },
          { locale: L }
        );
      } else if (params.slug) {
        router.replace(
          { pathname, params: { slug: otherPageSlug } },
          { locale: L }
        );
      }
    } else {
      router.replace({ pathname, params }, { locale: L });
    }
  }

  const context = {
    systemState,
    setDarkTheme,
    setLightTheme,
    setSystemTheme,
    active,
    ariaActive,
    changeTheme,
    handleKeypress,
    setOtherPageSlug,
    changeLang,
  };

  return (
    <PreferencesContext.Provider value={context}>
      {props.children}
    </PreferencesContext.Provider>
  );
}

export default PreferencesContext;
