"use client";

import { Link } from "@/navigation";
import { usePathname, useParams } from "next/navigation";
import Preferences from "@/components/Preferences";

export default function Navigation({ translation }) {
  const {
    Home,
    About,
    Projects,
    Blog,
    PreferencesT,
    Theme,
    Dark,
    Light,
    System,
    Language,
    LanguageStatus,
    Close,
  } = translation;

  const params = useParams();
  let pathname = usePathname();
  params.locale == "fa" && (pathname = decodeURI(pathname));
  // const pathnameArray = pathname.split("/");
  // if (params.locale == "fa" && pathnameArray.length == 3) {
  //   pathname = `/fa/${decodeURI(pathnameArray.pop())}`;
  // }

  const prefencesTranslations = {
    PreferencesT,
    Theme,
    Dark,
    Light,
    System,
    Language,
    LanguageStatus,
    Close,
  };

  let isBlog = false;
  if (
    pathname == "/en/blog/code" ||
    pathname == "/en/blog/notes" ||
    pathname == "/fa/بلاگ/یادداشت-ها" ||
    pathname == "/fa/بلاگ/کد"
  ) {
    isBlog = true;
  }

  return (
    <header className="container" dir="ltr">
      <nav>
        <ul className="nav--list" id="nav-menu">
          <li>
            <Preferences prefencesTranslations={prefencesTranslations} />
          </li>

          <li className={ pathname === "/fa" || pathname === "/en" ? "active--link" : ""}>
            <Link href="/" className="nav--link nav--link-home ">
              {Home}
            </Link>
          </li>

          <li
            className={
              pathname === "/fa/درباره-من" || pathname === "/en/me"
                ? "active--link"
                : ""
            }
          >
            <Link href="/me" className="nav--link nav--link-about">
              {About}
            </Link>
          </li>

          <li
            className={
              pathname === "/fa/پروژه-ها" || pathname === "/en/projects"
                ? "active--link"
                : ""
            }
          >
            <Link href="/projects" className="nav--link nav--link-projects">
              {Projects}
            </Link>
          </li>

          <li className={isBlog ? "active--link" : ""}>
            <Link href="/blog/notes" className="nav--link nav--link-blog">
              {Blog}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
