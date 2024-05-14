interface MediaItem {
  id: number;
  model_type: string;
}

export function queueGroupId(
  model: MediaItem,
  kind: string = '*',
  sortDescriptor?: {orderBy?: string; orderDir?: string}
): string {
  let base = `${model.model_type}.${model.id}.${kind}`;
  if (sortDescriptor?.orderBy && sortDescriptor?.orderDir) {
    base += `.${sortDescriptor.orderBy.replace('.', '^')}|${
      sortDescriptor.orderDir
    }`;
  }
  return base;
}
