import react from "../assets/react.svg";
import python from "../assets/python.svg";
import django from "../assets/django.svg";
import node from "../assets/node.svg";
import postgres from "../assets/postgres.svg";
import mongo from "../assets/mogo.svg";
import html from "../assets/html.svg";
import js from "../assets/js.svg";
import tailwind from "../assets/tailwind.svg";
import express from "../assets/espress.svg";

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "HTML", icon: html },
      { name: "JavaScript", icon: js },
      { name: "React", icon: react },
      { name: "Tailwind", icon: tailwind },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Python", icon: python },
      { name: "Django", icon: django },
      { name: "Node.js", icon: node },
      { name: "Express.js", icon: express },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL", icon: postgres },
      { name: "MongoDB", icon: mongo },
    ],
  },
];
