import { validateEmail, validatePassword } from './utils';

type RuleNames = 'required' | 'notZero' | 'email' | 'password';
type Rule = RuleNames | [RuleNames, string];

export const validate = (value: any, rules: Array<Rule> = []) => {
  const errors: Array<string> = [];
  if (rules.length === 0) return errors;

  const checkRule = (rule, errMsg = '') => {
    switch (rule) {
      case 'required':
        if (value === undefined || value === null || value === '' || value === false) errors.push(errMsg || 'This field is required');
        break;

      case 'notZero':
        if (value === 0) errors.push(errMsg || 'Value should not be "0"');
        break;
      case 'email':
        if (!validateEmail(value)) errors.push(errMsg || 'Invailid email');
        break;
      case 'password':
        if (!validatePassword(value)) errors.push(errMsg || 'Invailid password');
        break;

      default:
        break;
    }
  };

  rules.forEach((rule: Rule) => {
    if (typeof rule === 'string') {
      checkRule(rule, '');
    } else {
      checkRule(rule[0], rule[1]);
    }
  });

  return errors;
};
