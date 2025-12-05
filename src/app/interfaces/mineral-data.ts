export interface MineralData {
  mineralIdentifier: string;
  mineralName: string;
  mineralGroup: string;
  mineralHardness: number;
  mineralGrainSize: number;
  mineralGrainShape: string;
  mineralClassification: string;
  mineralCristalSize: number;
  mineralFormationTemperature: number;
  mineralStructure: string;
  mineralTexture: string;

  buildingClassification?: boolean;
  ornamentalClassification?: boolean;
  toolClassification?: boolean;
  wornClassification?: boolean;
}
