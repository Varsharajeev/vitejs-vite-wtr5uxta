export type FieldType = 'text' | 'date' | 'signature' | 'checkbox';

export interface Position {
  x: number; // percent (0-100)
  y: number; // percent
}

export interface BlueprintField {
  id: string;
  type: FieldType;
  label: string;
  position: Position;
  width?: number;
}

export interface Blueprint {
  id: string;
  name: string;
  fields: BlueprintField[];
  createdAt: string;
}

export interface ContractField extends Omit<BlueprintField, 'id'> {
  id: string;
  value?: string | boolean;
}

export type ContractStatus =
  | 'Created'
  | 'Approved'
  | 'Sent'
  | 'Signed'
  | 'Locked'
  | 'Revoked';

export interface Contract {
  id: string;
  name: string;
  blueprintId: string;
  blueprintName: string;
  fields: ContractField[];
  status: ContractStatus;
  createdAt: string;
  updatedAt?: string;
  signedAt?: string;
  revokedAt?: string;
}
