import * as React from "react";
import { Link } from "react-router-dom";
import Nib from "./nib";
import { Routes } from "../pages/routes";

export default function EmptyPosts(): JSX.Element {
  return (
    <section className="Wrapper" data-testid="NO_ENTRIES_PROMPT">
      <div className="GettingStartedContainer">
        <div className="EmptyBlockRight">
          <Nib />
        </div>
        <div className="EmptyBlockLeft">
          <h4 className="GettingStartedTitle">
            Looks like you don't have any entries
          </h4>
          <Link to={Routes.NEW} className="GettingStarted">
            Get Started &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}