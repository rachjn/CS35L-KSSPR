import React from "react";
import Link from "next/link";
import "./about.css";

export default function About() {
  return (
    <div className="about-container">
      <h1 className="about-title">About</h1>
      <div className="about-description-box">
        <p className="about-description">
          "Oops I Had an Acc(id)ent" is an educational typing game that
          challenges users to type what they hear — specifically, words spoken
          in different English accents from around the world. By practicing with
          these accents, you’ll improve your listening and typing skills while
          also becoming more comfortable with how English sounds across
          different cultures and regions.
        </p>
        <p className="about-description">
          Our goal is to help users build a deeper understanding and
          appreciation for accents, while also promoting inclusivity and
          empathy. In a world where people with non-standard accents often face
          bias, we want to combat linguistic racism and encourage more
          open-minded, respectful communication. Through this game, we hope to
          create a space where linguistic diversity is celebrated, and
          everyone’s way of speaking is valued.
        </p>
      </div>
      <div className="button-container">
        <Link href="/" passHref>
          <button className="back-button">Back</button>
        </Link>
      </div>
    </div>
  );
}
