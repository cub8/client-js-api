type RemoveUndefined<DataType> = {
  [Key in keyof DataType]?: Exclude<DataType[Key], undefined>
}

export function removeUndefinedFieldsTransformer<DataType extends Record<string, unknown>>(
  data: DataType,
): RemoveUndefined<DataType> {
  const removedUndefined = Object.entries(data).filter(([_, v]) => v !== undefined)
  return Object.fromEntries(removedUndefined) as RemoveUndefined<DataType>
}
