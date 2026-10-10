'use client'

import { useState, type ReactNode } from 'react'
import { Fld, Rows, Seg, TabbedMock } from './Tm'

const fmt = (n: number) => n.toLocaleString('en-US')

/** Illustrative quote calculator: 8% a year, compounded monthly. Not a real quote. */
function QuotePane({ live }: { live?: boolean }) {
  const [m, setM] = useState(25000)
  const [y, setY] = useState(20)
  const r = 0.08 / 12
  const fund = Math.round(m * ((Math.pow(1 + r, y * 12) - 1) / r))
  const pm = ((m - 10000) / 190000) * 100
  const py = ((y - 5) / 35) * 100
  return (
    <>
      <p className="t1">Quick quote</p>
      <p className="t3">
        Monthly contribution <b className="mv">{fmt(m)}</b>
      </p>
      {live ? (
        <input
          type="range"
          className="rg1"
          min={10000}
          max={200000}
          step={5000}
          value={m}
          aria-label="Monthly contribution"
          onChange={(e) => setM(+e.target.value)}
        />
      ) : (
        <div className="fakerange" style={{ '--p': `${pm}%` } as React.CSSProperties}>
          <i />
        </div>
      )}
      <p className="t3">
        Years to retirement <b className="yv">{y}</b>
      </p>
      {live ? (
        <input
          type="range"
          className="rg2"
          min={5}
          max={40}
          value={y}
          aria-label="Years to retirement"
          onChange={(e) => setY(+e.target.value)}
        />
      ) : (
        <div className="fakerange" style={{ '--p': `${py}%` } as React.CSSProperties}>
          <i />
        </div>
      )}
      <div className="res">
        <p className="t3">Estimated fund</p>
        <p className="t0 fv">{fmt(fund)}</p>
        <p className="t3">Illustrative estimate, not a quote</p>
      </div>
    </>
  )
}

function Portal({ live }: { live?: boolean }) {
  return (
    <TabbedMock
      live={live}
      ac="#0F766E"
      brand="InsureCo"
      tabs={['Personal', 'Medical', 'Plan', 'Review', 'Pay', 'Quote']}
      panes={[
        <>
          <p className="t1">Personal details</p>
          <Fld l="Full name" />
          <Fld l="Date of birth" w={55} />
          <Fld l="Phone number" w={70} />
          <p className="t3">Gender</p>
          <Seg items={['Female', 'Male']} on={0} />
        </>,
        <>
          <p className="t1">Medical questionnaire</p>
          <p className="t3">Do you smoke?</p>
          <Seg items={['No', 'Yes']} on={0} />
          <p className="t3">Any existing conditions?</p>
          <Seg items={['No', 'Yes']} on={1} />
          <p className="t3">Please describe</p>
          <div className="inp tall" />
        </>,
        <>
          <p className="t1">Choose your plan</p>
          <div className="pc on">
            <p className="t2">Deferred Annuity Plan</p>
            <p className="t3">Save now, receive income at retirement</p>
          </div>
          <div className="pc">
            <p className="t2">Education Savings Plan</p>
            <p className="t3">Fund school fees ahead of time</p>
          </div>
          <p className="t3">Contribution</p>
          <Seg items={['Monthly', 'Quarterly', 'Annual']} on={0} />
        </>,
        <>
          <p className="t1">Review and sign</p>
          <Rows
            items={[
              ['Personal details', 'Done', 'ok'],
              ['Medical answers', 'Done', 'ok'],
              ['Plan and contribution', 'Done', 'ok'],
            ]}
          />
          <p className="t3">Declaration</p>
          <div className="inp sig" />
        </>,
        <>
          <p className="t1">Payment</p>
          <div className="rw">
            <p className="t2">First contribution</p>
            <b className="t2">25,000</b>
          </div>
          <div className="cta t2" style={{ width: '100%', textAlign: 'center' }}>
            Pay securely
          </div>
          <p className="t3">Card or bank transfer</p>
        </>,
        <QuotePane key="q" live={live} />,
      ]}
    />
  )
}

function Vendor({ live }: { live?: boolean }) {
  return (
    <TabbedMock
      live={live}
      ac="#0E7490"
      brand="BidHub"
      tabs={['Register', 'Bids', 'Track', 'Profile']}
      panes={[
        <>
          <p className="t1">Vendor registration</p>
          <Fld l="Company name" />
          <Fld l="Business email" w={70} />
          <Fld l="Phone number" w={55} />
          <p className="t3">Category</p>
          <Seg items={['Supplies', 'Services', 'Works']} on={0} />
          <div className="cta t2">Submit for approval</div>
        </>,
        <>
          <p className="t1">Open bids</p>
          <Rows
            items={[
              ['Office supplies tender', 'Live', 'ok'],
              ['Facility maintenance', 'Opens in 2 days', 'wa'],
              ['IT equipment', 'Closed', 'pe'],
            ]}
          />
        </>,
        <>
          <p className="t1">Track your bid</p>
          <Rows
            items={[
              ['Submitted', 'Done', 'ok'],
              ['Under review', 'Now', 'wa'],
              ['Outcome announced', 'Next', 'pe'],
            ]}
          />
        </>,
        <>
          <p className="t1">Company profile</p>
          <div className="rw">
            <p className="t2">Account status</p>
            <span className="pl t3 ok">Approved</span>
          </div>
          <Fld l="Company name" />
          <Fld l="Registered address" w={80} />
        </>,
      ]}
    />
  )
}

function Admin({ ac, tabs, chat, live }: { ac: string; tabs: string[]; chat?: boolean; live?: boolean }) {
  const roles = ['Admin', 'Agent', 'Reviewer', 'Viewer']
  const actions = ['View quotations', 'Edit quotations', 'Approve', 'Manage users']
  return (
    <TabbedMock
      live={live}
      ac={ac}
      brand="CoreAdmin"
      side
      chat={chat}
      tabs={tabs}
      panes={[
        <>
          <p className="t1">{tabs[0]}</p>
          <div className="kp">
            {(
              [
                ['Open', '128'],
                ['Tasks due', '14'],
                ['Approved', '86'],
              ] as const
            ).map(([l, n]) => (
              <div key={l}>
                <p className="t3">{l}</p>
                <p className="t0">{n}</p>
              </div>
            ))}
          </div>
          <div className="cht">
            {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
              <i key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </>,
        <>
          <p className="t1">Quotations</p>
          <Rows
            items={[
              ['Quote 0142', 'Approved', 'ok'],
              ['Quote 0141', 'In review', 'wa'],
              ['Quote 0139', 'Pending', 'pe'],
              ['Quote 0138', 'Approved', 'ok'],
            ]}
          />
        </>,
        <>
          <p className="t1">Tasks</p>
          <Rows
            items={[
              ['Follow up on Quote 0141', 'Today', 'pe'],
              ['Review medical answers', 'Today', 'pe'],
              ['Send policy documents', 'Tomorrow', 'pe'],
            ]}
          />
        </>,
        <>
          <p className="t1">{tabs[3] === 'Roles' ? 'Roles and permissions' : tabs[3]}</p>
          <div className="gr">
            <span />
            {roles.map((r) => (
              <b className="t3" key={r}>
                {r}
              </b>
            ))}
          </div>
          {actions.map((a, i) => (
            <div className="gr" key={a}>
              <p className="t2">{a}</p>
              {[0, 1, 2, 3].map((j) => (
                <i key={j} className={`sw2${(i + j) % 3 !== 2 && !(j === 3 && i > 0) ? ' on' : ''}`} />
              ))}
            </div>
          ))}
        </>,
      ]}
    />
  )
}

function StellArts({ live }: { live?: boolean }) {
  const artisans: [string, string, string, string][] = [
    ['Plumber', '0.8 km', 'Available now', 'ok'],
    ['Electrician', '1.4 km', 'Today', 'wa'],
    ['Carpenter', '2.1 km', 'Tomorrow', 'pe'],
  ]
  const steps: [string, string][] = [
    ['Funds locked', 'ok'],
    ['Job in progress', 'wa'],
    ['Confirm completion', 'pe'],
    ['Funds released', 'pe'],
  ]
  return (
    <TabbedMock
      live={live}
      ac="#6D28D9"
      brand="StellArts"
      tabs={['Discover', 'Book', 'Escrow', 'Reviews']}
      panes={[
        <>
          <div className="srch" style={{ height: '3.6em', marginBottom: '1.4em' }} />
          {artisans.map(([name, dist, when, cls]) => (
            <div className="rw" key={name}>
              <div style={{ display: 'flex', gap: '1.2em', alignItems: 'center' }}>
                <i className="av2" />
                <div>
                  <p className="t2">{name}</p>
                  <p className="t3" style={{ margin: 0 }}>
                    {dist} away, verified
                  </p>
                </div>
              </div>
              <span className={`pl t3 ${cls}`}>{when}</span>
            </div>
          ))}
        </>,
        <>
          <p className="t1">Book a plumber</p>
          <p className="t3">Date</p>
          <Seg items={['Mon', 'Tue', 'Wed']} on={1} />
          <p className="t3">Describe the job</p>
          <div className="inp tall" />
          <div className="cta t2">Request booking</div>
        </>,
        <>
          <p className="t1">Escrow payment</p>
          {steps.map(([label, cls], i) => (
            <div className="rw" key={label}>
              <p className="t2">
                {i + 1}. {label}
              </p>
              <span className={`pl t3 ${cls}`}>{i < 1 ? 'Done' : i < 2 ? 'Now' : 'Next'}</span>
            </div>
          ))}
          <p className="t3">Held on Stellar until you confirm the job is done</p>
        </>,
        <>
          <div style={{ display: 'flex', gap: '2em', alignItems: 'center' }}>
            <p className="t0" style={{ fontSize: '5em' }}>
              4.8
            </p>
            <p className="t2">
              ★★★★★
              <br />
              <span className="t3">from verified jobs</span>
            </p>
          </div>
          <Rows
            items={[
              ['Arrived on time and fixed it fast', 'Verified', 'ok'],
              ['Clear price, no surprises', 'Verified', 'ok'],
            ]}
          />
        </>,
      ]}
    />
  )
}

function Sentinel({ live }: { live?: boolean }) {
  const mono = { fontFamily: 'ui-monospace,Menlo,monospace' }
  return (
    <TabbedMock
      live={live}
      ac="#B91C1C"
      brand="Sentinel"
      side
      tabs={['Alerts', 'Watchlist', 'Signatures', 'Channels']}
      panes={[
        <>
          <p className="t1">Live alerts</p>
          <Rows
            items={[
              ['Ownership transfer pending', 'Critical', 'cr'],
              ['Large transfer detected', 'High', 'wa'],
              ['Contract upgrade queued', 'Info', 'ok'],
            ]}
          />
        </>,
        <>
          <p className="t1">Watchlist</p>
          <Rows
            items={[
              ['GA7K...2QF', 'Stellar', 'pe'],
              ['0x91c4...8e0a', 'EVM', 'pe'],
              ['0x2d7b...f31c', 'EVM', 'pe'],
            ]}
          />
        </>,
        <>
          <p className="t1">Danger signatures</p>
          {['renounceOwnership', 'drainLiquidity', 'upgradeTo'].map((x) => (
            <div className="rw" key={x}>
              <p className="t2" style={mono}>
                {x}()
              </p>
              <i className="sw2 on" />
            </div>
          ))}
        </>,
        <>
          <p className="t1">Alert channels</p>
          {(
            [
              ['Discord', true],
              ['Telegram', true],
              ['PagerDuty', false],
            ] as const
          ).map(([name, on]) => (
            <div className="rw" key={name}>
              <p className="t2">{name}</p>
              <i className={`sw2${on ? ' on' : ''}`} />
            </div>
          ))}
        </>,
      ]}
    />
  )
}

function Api({
  ac,
  brand,
  eps,
  res,
  sub,
  live,
}: {
  ac: string
  brand: string
  eps: [string, string, string][]
  res: string
  sub: string
  live?: boolean
}) {
  return (
    <TabbedMock
      live={live}
      ac={ac}
      brand={brand}
      tabs={['Endpoints', 'Request', 'Response']}
      panes={[
        <>
          <p className="t1">{sub}</p>
          {eps.map(([method, path, status]) => (
            <div className="rw" key={path}>
              <div style={{ display: 'flex', gap: '1.2em', alignItems: 'center' }}>
                <b className={`mth ${method.toLowerCase()}`}>{method}</b>
                <p className="t2" style={{ fontFamily: 'ui-monospace,Menlo,monospace' }}>
                  {path}
                </p>
              </div>
              <span className="pl t3 ok">{status}</span>
            </div>
          ))}
        </>,
        <>
          <p className="t1">Try it</p>
          <div className="code2">
            <span>
              {eps[1][0]} {eps[1][1]}
            </span>
            <br />
            <span className="d">Authorization: Bearer ...</span>
            <br />
            <span className="d">Content-Type: application/json</span>
          </div>
          <div className="cta t2">Send request</div>
        </>,
        <>
          <p className="t1">Response</p>
          <div className="rw">
            <p className="t2">Status</p>
            <span className="pl t3 ok">{eps[1][2]}</span>
          </div>
          <div className="code2">
            <span className="g">{res}</span>
          </div>
        </>,
      ]}
    />
  )
}

/** The recreated screen for a project id, or null when the project uses a real screenshot. */
export function Mock({ id, live }: { id: string; live?: boolean }): ReactNode {
  switch (id) {
    case 'portal':
      return <Portal live={live} />
    case 'vendor':
      return <Vendor live={live} />
    case 'life':
      return <Admin live={live} ac="#4338CA" tabs={['Dashboard', 'Quotations', 'Tasks', 'Permissions']} chat />
    case 'general':
      return <Admin live={live} ac="#9D174D" tabs={['Overview', 'Quotations', 'Tasks', 'Roles']} />
    case 'stellarts':
      return <StellArts live={live} />
    case 'sentinel':
      return <Sentinel live={live} />
    case 'manta':
      return (
        <Api
          live={live}
          ac="#0F766E"
          brand="MantaHQ"
          sub="Nest + Mongoose"
          eps={[
            ['GET', '/users', '200'],
            ['POST', '/orders', '201'],
            ['GET', '/orders/:id', '200'],
          ]}
          res='{ "orderId": "8f2a", "status": "created" }'
        />
      )
    case 'ecom':
      return (
        <Api
          live={live}
          ac="#475569"
          brand="E-commerce API"
          sub="Products, cart, checkout"
          eps={[
            ['GET', '/products', '200'],
            ['POST', '/cart', '201'],
            ['POST', '/checkout', '201'],
          ]}
          res='{ "cartId": "c19", "items": 3 }'
        />
      )
    case 'stark':
      return (
        <Api
          live={live}
          ac="#7C3AED"
          brand="StarkHive API"
          sub="Auth, wallet, audit"
          eps={[
            ['POST', '/auth/login', '200'],
            ['GET', '/wallet', '200'],
            ['GET', '/audit', '200'],
          ]}
          res='{ "token": "eyJhbGci...", "expires": 3600 }'
        />
      )
    default:
      return null
  }
}
