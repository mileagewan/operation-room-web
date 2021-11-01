import { rule } from '@/types/interface-model';

const REQUIRED: rule = {
  required: true,
  message: '必填',
  trigger: 'blur',
};
const REQUIRED_CHANGE: rule = {
  required: true,
  message: '必填',
  trigger: 'change',
};

const WORD_CHAR: rule = {
  pattern: /^[\w]*$/g,
  message: '只支持大小写字母、数字和下划线',
  trigger: 'blur',
};

const MIN_MAX = (min: number, max: number): rule => {
  return {
    min: min || 1,
    max: max || 50,
    message: `输入长度为${min || 1}-${max || 50}`,
    trigger: 'blur',
  };
};
const NO_REPEAT = (data: any, field: string): rule => {
  return {
    validator: (rule: any, value: any, callback: any) => {
      const filterArr = data.filter((t: any) => {
        return t[field] === value;
      });
      if (filterArr.length > 1) {
        callback(new Error(field === 'name' ? '字段名称已存在' : '字段描述已存在'));
      } else {
        callback();
      }
    },
    trigger: 'blur',
  };
};
const DECIMALS = (row: any): rule => {
  return {
    validator: (rule: any, value: any, callback: any) => {
      if (row.columnDecimals < row.characterLength) {
        callback();
      } else {
        callback(new Error(`精度必须在0～${row.characterLength - 1}之间`));
      }
    },
    trigger: 'change',
  };
};
const ONLY_INT: rule = {
  pattern: /^\d+$/,
  message: '请输入正确的正整数',
  trigger: 'blur',
};
const NONE_ZERO: rule = {
  validator: (rule: any, value: any, callback: any) => {
    if (/^0$/.test(value)) {
      callback(new Error('请输入正确的正整数'));
    } else {
      callback();
    }
  },
  trigger: 'blur',
};
const CHARACTERLENGTH: rule = {
  required: true,
  message: '请输入正确的正整数',
  trigger: 'blur',
};

const INTEGER_RANGE = (min: any, max: any): rule => {
  return {
    validator: (rule: any, value: any, callback: any) => {
      try {
        const val = parseInt(value);
        if (val >= min && val <= max) {
          callback();
        } else {
          callback(new Error(`必须为介于${min}-${max}之间的整数`));
        }
      } catch (e) {
        callback(new Error(`必须为介于${min}-${max}之间的整数`));
      }
    },
    trigger: 'blur',
  };
};

const ONLY_NUMBER: rule = {
  pattern: /^\d*$/,
  message: '只允许数字',
  trigger: 'blur',
};

const RULES = {
  REQUIRED,
  MIN_MAX,
  REQUIRED_CHANGE,
  WORD_CHAR,
  NO_REPEAT,
  ONLY_INT,
  NONE_ZERO,
  INTEGER_RANGE,
  ONLY_NUMBER,
  DECIMALS,
  CHARACTERLENGTH,
};

export {
  REQUIRED,
  MIN_MAX,
  REQUIRED_CHANGE,
  WORD_CHAR,
  NO_REPEAT,
  ONLY_INT,
  NONE_ZERO,
  INTEGER_RANGE,
  ONLY_NUMBER,
  DECIMALS,
  CHARACTERLENGTH,
};

export default RULES;
