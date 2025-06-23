"use client"
import Typewriter from "../typewriter"
import { useState } from "react"
import { useTranslations } from "next-intl";

export default function TypewriterText() {
    const [isFirstLineFinished, setIsFirstLineFinished] = useState(false);
    const t = useTranslations("innovations");
    return (
        <>
            <Typewriter className="ml-auto mr-auto md:ml-8 md:mr-0 text-[#3e3c3c]" setIsFirstLineFinished={setIsFirstLineFinished} text={t("notJustFeatures")} />
            <Typewriter className="ml-auto mr-auto md:ml-16 md:mr-0 text-[#3e3c3c]" text={t("gameChangers")} shouldStart={isFirstLineFinished} />
        </>
    )
} 