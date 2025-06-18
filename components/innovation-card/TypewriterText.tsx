"use client"
import Typewriter from "../typewriter"
import { useState } from "react"
import { useTranslations } from "next-intl";

export default function TypewriterText() {
    const [isFirstLineFinished, setIsFirstLineFinished] = useState(false);
    const t = useTranslations("innovations");
    return (
        <>
            <Typewriter className="ml-8 text-maroon" setIsFirstLineFinished={setIsFirstLineFinished} text={t("notJustFeatures")} />
            <Typewriter className="ml-16" text={t("gameChangers")} shouldStart={isFirstLineFinished} />
        </>
    )
} 