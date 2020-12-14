export interface AttributeDefinition {
  fieldName: string;
  operations: string[];
}

export const CATEGORICAL_OPERATIONS = [
  '~',
  '!~',
  '=',
  '!=',
  '>',
  '<',
  '<=',
  '>='
]

export const OPERATION_NAMES: Record<string, string> = {
  '~': 'contains',
  '!~': 'does not contain',
  '=': 'is equal to',
  '!=': 'is not equal to',
  '>': 'is greater than',
  '<': 'is less than',
  '>=': 'is greater or equal to',
  '<=': 'is less than or equal to'
}
export const COMBINATORS = ['^^', '||']

const TypeAttribute = {
  fieldName: 'type',
  operations: CATEGORICAL_OPERATIONS
}

const BodyAttribute = {
  fieldName: 'body',
  operations: CATEGORICAL_OPERATIONS
}

const NameAttribute = {
  fieldName: 'name',
  operations: CATEGORICAL_OPERATIONS
}

export const Attributes = [TypeAttribute, BodyAttribute, NameAttribute]
export const ATTRIBUTE_VALUES = Attributes.map(
  (attribute) => attribute.fieldName
)

export enum CommandType {
  ATTRIBUTE = 0,
  OPERATION = 1,
  VALUE = 2,
  COMBINATOR = 3,
}

export enum AttributeType {
  categorical = 0,
}

export const STEP_ORDER: CommandType[] = [
  CommandType.ATTRIBUTE,
  CommandType.OPERATION,
  CommandType.VALUE,
  CommandType.COMBINATOR
]

export const STEPS_IN_SINGLE_COMMAND = STEP_ORDER.length - 1 // eliminate combinator
export const STEPS_IN_COMMAND_EXTENSION = STEP_ORDER.length

export const AttributeTypeMap: Record<string, string[]> = {
  type: ['=', '!='],
  body: ['=', '!=', '~', '!~'],
  name: ['=', '!=', '<', '>', '<=', '>=']
}
