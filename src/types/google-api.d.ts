// Google API TypeScript declarations
declare global {
  interface Window {
    gapi: {
      load: (apis: string, callback: () => void) => void;
      client: {
        init: (config: {
          apiKey: string;
          clientId: string;
          discoveryDocs: string[];
          scope: string;
        }) => Promise<void>;
        calendar: {
          events: {
            list: (params: {
              calendarId: string;
              timeMin: string;
              timeMax: string;
              singleEvents: boolean;
              orderBy: string;
            }) => Promise<{
              result: {
                items: Array<{
                  id: string;
                  summary: string;
                  start: {
                    dateTime: string;
                    timeZone: string;
                  };
                  end: {
                    dateTime: string;
                    timeZone: string;
                  };
                }>;
              };
            }>;
            insert: (params: {
              calendarId: string;
              resource: any;
              sendUpdates: string;
            }) => Promise<any>;
          };
        };
      };
      auth2: {
        getAuthInstance: () => {
          isSignedIn: {
            get: () => boolean;
          };
          signIn: () => Promise<void>;
        };
      };
    };
  }
}

export {};