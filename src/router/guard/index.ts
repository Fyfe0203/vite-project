import router from '/@/router'

import { createProgressGuard } from './progressGuard'
import { createPermissionGuard } from './permissionGuard'
import { createMessageGuard } from './messageGuard'
import { createTitleGuard } from './titleGuard'
import { createStateGuard } from './stateGuard'

// import { createPageLoadingGuard } from './pageLoadingGuard'
// import { createScrollGuard } from './scrollGuard'
// import { createHttpGuard } from './httpGuard'
// import { createPageGuard } from './pageGuard'

createProgressGuard(router)
createPermissionGuard(router)
createMessageGuard(router)
createTitleGuard(router)
createStateGuard(router)

// createPageGuard(router)
// createPageLoadingGuard(router)
// createHttpGuard(router)
// createScrollGuard(router)
