import { ContractStatus } from '../types';

const transitions: Record<ContractStatus, ContractStatus[]> = {
  Created: ['Approved', 'Revoked'],
  Approved: ['Sent'],
  Sent: ['Signed', 'Revoked'],
  Signed: ['Locked'],
  Locked: [],
  Revoked: [],
};

export function allowedNextStatuses(current: ContractStatus): ContractStatus[] {
  return transitions[current] ?? [];
}

export function canTransition(current: ContractStatus, target: ContractStatus) {
  return allowedNextStatuses(current).includes(target);
}
