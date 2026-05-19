"use client";

import SectionTitle from "@components/section-title";
import Image from "next/image";
import { cards } from "./constants";
import { aboutSectionStyles } from "./styles";

export function AboutSection() {
  return (
    <section id="sobre" className={aboutSectionStyles().section()}>
      <div className={aboutSectionStyles().container()}>
        {/* Header Section */}
        <SectionTitle
          eyebrow="sobre"
          title="Produtos digitais devem ser claros, humanos e fazer sentido."
          description="O 098lab opera na intersecção entre estética apurada, engenharia de ponta e foco implacável nas necessidades reais das pessoas."
        />

        {/* Bento Grid Cards Section */}
        <div className="w-full">
          <div className={aboutSectionStyles().grid()}>
            {cards.map((card, index) => {
              const cardStyles = aboutSectionStyles({
                isPrimary: card.isPrimary,
              });

              return (
                <div key={card.id} className={cardStyles.card()}>
                  {/* Subtle Hover effect */}
                  <div className={cardStyles.hoverOverlay()} />

                  {/* Card Header */}
                  <div className="flex justify-between items-start relative z-10">
                    <Image
                      src={card.icon}
                      alt={card.id}
                      width={64}
                      height={64}
                      className="object-contain"
                    />

                    <span className={cardStyles.cardIndex()}>
                      {index + 1}. {card.id}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className={cardStyles.cardContent()}>
                    <h3 className={cardStyles.cardTitle()}>{card.title}</h3>
                    <p className={cardStyles.cardText()}>{card.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
