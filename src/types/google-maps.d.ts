declare namespace google.maps {
  class places {
    static Autocomplete: new (
      input: HTMLInputElement,
      options?: AutocompleteOptions
    ) => Autocomplete;
  }

  interface AutocompleteOptions {
    componentRestrictions?: {
      country: string | string[];
    };
    fields?: string[];
  }

  interface Autocomplete {
    addListener(event: string, handler: () => void): void;
    getPlace(): {
      formatted_address?: string;
      [key: string]: any;
    };
  }

  namespace event {
    function clearInstanceListeners(instance: any): void;
  }
}