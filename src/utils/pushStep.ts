import type { VisualizationStep } from "../types/VisualizationStep"

const pushStep = (
  steps: VisualizationStep[],
  step: VisualizationStep
) => {
  steps.push(step)
}

export default pushStep