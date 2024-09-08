"use client";

import React, { useEffect, useState } from "react";
import { DashboardContentLayout } from "@/components/layout/dashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PickPlaybook from "@/components/characters/pick-playbook";
import AssignRatings from "@/components/characters/assign-ratings";
import ChooseMoves from "@/components/characters/choose-moves";
import { Avatar } from "@/components/ui/avatar";
import Heading from "@/components/layout/heading";
import { Input } from "@/components/ui/input";
import { MotWCharacter } from "@/types/characters";
// import DefineHistory from './steps/DefineHistory'
// import ReviewCharacter from './steps/ReviewCharacter'

const steps = [
  { id: "playbook", label: "1. Playbook", component: PickPlaybook },
  { id: "ratings", label: "2. Ratings", component: AssignRatings },
  { id: "moves", label: "Moves", component: ChooseMoves },
  // { id: 'history', label: 'History', component: DefineHistory },
  // { id: 'review', label: 'Review', component: ReviewCharacter },
];

type BuilderPageProps = {
  userCharacter: MotWCharacter;
};

export default function BuilderPage({ userCharacter }: BuilderPageProps) {
  const [currentStep, setCurrentStep] = useState("playbook");
  const [character, setCharacter] = useState<MotWCharacter>({
    name: userCharacter.name || "",
    playbook: userCharacter.playbook || "Unknown",
    look: userCharacter.look || "",
    ratings: userCharacter.ratings || {
      Cool: 0,
      Tough: 0,
      Charm: 0,
      Sharp: 0,
      Weird: 0,
    },
    luck: userCharacter.luck || 0,
    harm: userCharacter.harm || 0,
    experience: userCharacter.experience || 0,
    moves: userCharacter.moves || [],
    improvements: userCharacter.improvements || [],
    gear: userCharacter.gear || [],
    history: userCharacter.history || {},
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedStep = localStorage.getItem("currentStep");
    const savedCharacter = localStorage.getItem("character");

    if (savedStep) setCurrentStep(savedStep);
    if (savedCharacter) setCharacter(JSON.parse(savedCharacter));
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem("currentStep", currentStep);
    localStorage.setItem("character", JSON.stringify(character));
  }, [currentStep, character]);

  const updateCharacter = (newData: any) => {
    setCharacter({ ...character, ...newData });
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const prevStep = () => {
    const currentIndex = steps.findIndex((step) => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <DashboardContentLayout className="flex flex-1 flex-col gap-4 md:gap-8">
      <Tabs value={currentStep} onValueChange={setCurrentStep}>
        <TabsList>
          {steps.map((step) => (
            <TabsTrigger key={step.id} value={step.id}>
              {step.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <section className="flex gap-2 pt-4">
          <Avatar
            variant="rounded"
            size="xl"
            src="/images/the-chosen-one.png"
          />
          <div className="space-y-2">
            <Input placeholder="Name" />
            <Heading as="h6" size="xs">
              The Chosen One
            </Heading>
          </div>
        </section>
        {steps.map((step) => (
          <TabsContent key={step.id} value={step.id} className="mt-4">
            <step.component
              character={character}
              updateCharacter={updateCharacter}
            />
          </TabsContent>
        ))}
      </Tabs>
      <div className="mt-4 flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === steps[0].id}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps[steps.length - 1].id}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </DashboardContentLayout>
  );
}
