import Company from "../api/company.js";
import Vacancy from "../api/vacancy.js";
import Common from "../api/common.js";
import Technology from "../api/technology.js";
import Profile from "../api/profile.js";
import Cv from "../api/cv.js";
import Image from "@/api/image.js";
import Match from "../api/match.js";
import Payment from "@/api/payment.js";
import Note from "@/api/note.js";

export default (context, inject) => {
  const factories = {
    common: Common(context.$axios),
    company: Company(context.$axios),
    vacancy: Vacancy(context.$axios),
    technology: Technology(context.$axios),
    profile: Profile(context.$axios),
    cv: Cv(context.$axios),
    image: Image(context.$axios),
    match: Match(context.$axios),
    payment: Payment(context.$axios),
    note: Note(context.$axios)
  };

  inject("api", factories);
};
