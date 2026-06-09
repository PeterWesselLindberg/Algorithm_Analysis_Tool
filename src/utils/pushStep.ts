import type { VisualizationStep } from "../types/VisualizationStep"

const pushStepCore= (
  steps: VisualizationStep[],
  step: VisualizationStep
) => {
  steps.push(step)
}

export const pushStepTree = (
  steps: VisualizationStep[],
  step: VisualizationStep
) => {

  pushStepCore(steps, step)
}

export const pushStep = (
  steps: VisualizationStep[],
  step: Omit<VisualizationStep, "tree">
) => {
  pushStepCore(steps, {
    tree: null,
    ...step
  })
}



export default pushStepCore