interface stateData {
  id: number;
  name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface localData {
  id: number;
  name: string;
  state: stateData;
  status: string;
  created_at: string;
  updated_at: string;
}
interface areaData {
  id: number;
  name: string;
  local: localData;
  status: string;
  created_at: string;
  updated_at: string;
}
