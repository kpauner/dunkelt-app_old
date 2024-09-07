"use client";

import React, { useEffect, useState } from "react";
import PickPlaybook from "@/components/characters/pick-playbook";
import AssignRatings from "@/components/characters/assign-ratings";
import { DashboardContentLayout } from "@/components/layout/dashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import ChooseMoves from '@/components/characters/choose-moves'
// import DefineHistory from './steps/DefineHistory'
// import ReviewCharacter from './steps/ReviewCharacter'

const steps = [
  { id: "playbook", label: "1. Playbook", component: PickPlaybook },
  { id: "ratings", label: "2. Ratings", component: AssignRatings },
  // { id: 'moves', label: 'Moves', component: ChooseMoves },
  // { id: 'history', label: 'History', component: DefineHistory },
  // { id: 'review', label: 'Review', component: ReviewCharacter },
];

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState("playbook");
  const [character, setCharacter] = useState({});

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
