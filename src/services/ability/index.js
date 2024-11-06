// import gql from 'graphql-tag';
// import { useApolloClient } from '@/services/apollo';
// import store from '@/store'
import data from './test3.json';
// export default new Ability([]);
import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { Ability, detectSubjectType } from '@casl/ability';
export const AbilityContext = createContext({});
export const Can = createContextualCan(AbilityContext.Consumer);
// export default new Ability([]);
export let abilitys = new Ability([
  {
    action: 'manage',
    subject: 'all',
    inverted: true
  }
]);

export const updateAbility = async (ability) => {
  // const apolloClient = useApolloClient();
  // const user = computed(() => store.getters['user/user'].email)
  ability.update([]);
  console.log(data);
  const permissions = data.data.user_permissions;
  const allTargets = data.data.preset_permission_targets;
  if (data?.data?.organisations[0].account_mode_value === 'OMS') {
    applyOmsAbilities(ability, permissions, allTargets);
    // router.push('/orders')
  } else {
    applyInsightOnlyAbilities(ability, permissions);
  }
};

const applyInsightOnlyAbilities = (ability, permissions) => {
  const abilities = [];
  for (const permission of permissions) {
    abilities.push({
      action: permission.permission_type_value,
      subject: permission.permission_target_value
    });
  }
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_OVERVIEW' });
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_SELLERWIZARD_SUMMARY' });
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_SELLERWIZARD_FINANCE' });
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_SELLERWIZARD_OPS' });
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_SELLERWIZARD_INVENTORY' });
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_SELLERWIZARD_SALES' });
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_INVENTORIES' });
  abilities.push({ action: 'READ_ONLY', subject: 'PAGE_INVENTORIES_STOCK' });
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_PREFERENCES' });
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_GENERAL_PREFERENCES' });
  abilities.push({ action: 'FULL_ACCESS', subject: 'PAGE_APPEARANCE_PREFERENCES' });

  abilitys.update(abilities);
};

const applyOmsAbilities = (ability, permissions, allTargets) => {
  const abilities = [];
  const permObj = {};
  for (const permission of permissions) {
    permObj[permission.permission_target_value] = permission.permission_type_value;
  }
  for (const target of allTargets) {
    if (target === 'PAGE_PREFERENCES') {
      abilities.push({ action: permObj[target.value] || 'READ_ONLY', subject: target.value });
    } else {
      abilities.push({ action: permObj[target.value] || 'FULL_ACCESS', subject: target.value });
    }
  }
  abilitys.update(abilities);
};
export const hasAuthority = (I, A) => {
  console.log(abilitys.can(I, A));
  return abilitys.can(I, A);
};
