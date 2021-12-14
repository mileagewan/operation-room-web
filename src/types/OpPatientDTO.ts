export default interface OpPatientDTO {
  name: string;
  sex: number;
  age: number;
  hospitalCode: string;
  beforeDepartmentName: string;
  beforeDepartmentWardName: string;
  beforeWardBedNumber: string;
  afterDepartmentName: string;
  afterDepartmentWardName: string;
  beforeDiseaseName: string;
  infectTypeItemName: string;
  anesthesiaItemName: string;
  beforeDepartmentWardId: number
}
