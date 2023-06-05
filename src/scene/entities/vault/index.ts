import { GemKind } from '../../components/gem';
import { Gems } from '../../types';

type VaultOptions = {
  takeTwoThreshold: number;
};

enum CheckTakeResult {
  OK,
  NOT_ENOUGH,
  ILLEGAL,
}

function checkTake(gems: Gems, store: Gems) {
  let total = 0;
  let largeThanTwo = 0;
  for (const gem of gems) {
    total += gem.count;
    if (gem.count >= 2) largeThanTwo += 1;

    const storeCount = store.find((g) => g.kind === gem.kind)?.count ?? 0;
    if (storeCount < gem.count) return CheckTakeResult.NOT_ENOUGH;
  }

  if ((largeThanTwo === 1 && total === 2) || total <= 3) return CheckTakeResult.OK;

  // Take 2 same gems or <= 3 different gems
  return CheckTakeResult.ILLEGAL;
}

export class Vault {
  constructor(private store: Gems, private options: VaultOptions) {}

  canTakeOneGem(kind: GemKind) {
    const gem = this.store.find((gem) => gem.kind === kind);
    return gem?.count ?? 0 > 0;
  }

  canTakeTwoGem(kind: GemKind) {
    const gem = this.store.find((gem) => gem.kind === kind);
    return gem?.count ?? 0 >= this.options.takeTwoThreshold;
  }

  take(gems: Gems) {
    const checkResult = checkTake(gems, this.store);
    if (checkResult !== CheckTakeResult.OK) throw new Error(`Cannot take, error code: ${checkResult}`);

    gems.forEach(({ kind, count }) => {
      const gem = this.store.find((s) => s.kind === kind);
      if (!gem) throw new Error('Error when take gems');
      gem.count -= count;
    });
  }
}
