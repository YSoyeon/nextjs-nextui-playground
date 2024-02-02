declare type ClusterType = {
  id: number;
  name: string;
  description: string;
};

declare type WeaknessType = {
  cluster_ids: number[];
  context_type: any;
  external_id: string;
  id: number;
  name: string;
  description: string;
  state: string;
};
