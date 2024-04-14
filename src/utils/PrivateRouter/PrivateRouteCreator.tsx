import React, { Context, useContext } from 'react';
import { NavigateProps, Outlet, Navigate as Redirect, RouteProps } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = () => any;

interface PrivateRouteUsignContext<T> {
  context: Context<T>;
  accessWith: (context: T) => boolean;
  otherwiseRedirectTo?: FunctionType | NavigateProps;
}

/**
 * Function `createPrivateRouteUsignContext` validate route privacy through a context, 
 * This function supports react-router-dom v6 forward
 *
 * @param context - Global or module context to validate
 * @param accessWith - Conditions to validate access
 * @param otherwiseRedirectTo - Redirect to home page or any action you perform
 * @returns `React.FC<RouteProps>`
 * @example
 *
 *  Create a constant using the function `createPrivateRouteUsignContext`, sending the required parameters in router file.
 * 
 *  const PrivateRoute = createPrivateRouteUsignContext({
 *  context: GlobalContext,
 *  accessWith: (context): boolean => Boolean(context.state.identityValidation),
 *  otherwiseRedirectTo: () => navigate(APP_PATH.get(AppPath.CustomerSearch))});

 *  Then create the routes using `PrivateRoute`
 *
 *  <Routes>
 *    <Route element={<PrivateRoute />}>
 *     <Route path={DigitalKeyPath.DigitalKey} element={<DigitalKey />} />
 *    </Route>
 *    <Route path="*" element={<Redirect to={DigitalKeyPath.DigitalKey} replace />} />
 *  </Routes>   
 *
 */
export default function createPrivateRouteUsignContext<T>({
  context,
  accessWith,
  otherwiseRedirectTo = { to: '/' },
}: PrivateRouteUsignContext<T>): React.FC<RouteProps> {
  return function PrivateRoute() {
    const ctx = useContext(context);

    if (accessWith(ctx)) {
      return <Outlet />;
    }

    if (typeof otherwiseRedirectTo === 'function') {
      return otherwiseRedirectTo();
    }

    return <Redirect {...otherwiseRedirectTo} replace />;
  };
}
