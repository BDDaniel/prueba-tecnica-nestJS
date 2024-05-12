/**
 * Utility class providing helper functions for various tasks.
 */
export class Helper {
    /**
     * Checks if the input string is a valid date string.
     * Supports formats: YYYY-MM-DD, YYYY/MM/DD, YYYY-MM-DDTHH:mm:ss, YYYY-MM-DDTHH:mm:ssZ, YYYY-MM-DDTHH:mm:ss+hh:mm
     * @param date The date string to validate.
     * @returns True if the date string is valid, false otherwise.
     */
    public static isValidDate(date: string): boolean {
      const regex =
        /^(?:(?:\d{4}-\d{2}-\d{2})|(?:\d{4}\/\d{2}\/\d{2})|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)|(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}))$/;
      return regex.test(date);
    }
  
    /**
     * Finds the next available ID from an array of objects based on a specified ID field.
     * @param arrayObject The array of objects to search for IDs.
     * @param id The name of the ID field.
     * @returns The next available ID.
     */
    public static nextID(arrayObject: any[], id: string): number {
      // Filter out negative and zero IDs, then sort the array
      const positiveIds = arrayObject
        .filter((obj) => obj[id] > 0)
        .map((obj) => obj[id])
        .sort((a, b) => a - b);
  
      // Iterate over IDs to find the next available one
      let nextId = 1;
      for (const id of positiveIds) {
        if (id !== nextId) {
          // If a gap is found, return the next available ID
          return nextId;
        }
        nextId++;
      }
  
      // If no gap is found, return the next number after the last ID in the array
      return positiveIds.length > 0 ? positiveIds[positiveIds.length - 1] + 1 : 1;
    }
  
    /**
     * Orders the fields of an object based on the specified field order.
     * @param object The object whose fields are to be ordered.
     * @param fieldOrder The desired order of fields.
     * @returns An object with fields ordered according to fieldOrder.
     */
    public static orderFields(object: any, fieldOrder: string[]): any {
      const orderedFields = {};
      fieldOrder.forEach((field) => {
        if (object.hasOwnProperty(field)) {
          orderedFields[field] = object[field];
        }
      });
      return orderedFields;
    }
  
    /**
     * Orders an array of objects based on a specified field and direction.
     * @param array The array of objects to be ordered.
     * @param field The field by which to order the objects.
     * @param direction The direction of ordering, either "asc" for ascending or "desc" for descending.
     * @returns The ordered array of objects.
     */
    public static orderObjects(array: any[], field: string, direction: 'asc' | 'desc'): any[] {
      if (direction === 'asc') {
        return array.slice().sort((a, b) => a[field] - b[field]);
      } else if (direction === 'desc') {
        return array.slice().sort((a, b) => b[field] - a[field]);
      } else {
        console.error('Invalid ordering direction. It must be either "asc" or "desc".');
        return array;
      }
    }

    public static formatDate(date: Date): string {
      return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
    }
    
    private static padZero(num: number): string {
      return num.toString().padStart(2, '0');
    }
  }
  