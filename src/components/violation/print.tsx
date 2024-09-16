import { Show, createResource, useContext } from "solid-js";
import { useParams } from "@solidjs/router";

import { AuthContext } from "../../context/auth";
import { violationGetByControlNumber } from "../../services/violation";
import { Violation } from "../../models/violation";

const PrintHeader = () => (
  <>
    <div class="text-center">
      <h5 class="fw-bold">TENNESSEE FEEDMILL, INC. (TFI)</h5>
      <h6>Tungkil Minglanilla, Cebu</h6>
    </div>
    <div class="text-center">
      <h5 class="fw-bold">DISCIPLINARY ACTION FORM</h5>
    </div>
  </>
);

const PrintAction = () => (
  <>
    <table class="w-100">
      <tbody>
        <tr>
          <td>
            <div class="fw-bold">TYPE OF ACTION</div>
            <div>
              <div>
                <input type="checkbox" class="mx-1" />
                Verbal Warning
              </div>
              <div>
                <input type="checkbox" class="mx-1" />
                Written Warning
              </div>
              <div>
                <input type="checkbox" class="mx-1" />
                Suspension
              </div>
              <div>
                <input type="checkbox" class="mx-1" />
                Termination
              </div>
            </div>
          </td>
          <td class="align-bottom">
            <table class="w-100">
              <tbody>
                <tr>
                  <td class="text-end">Begins:</td>
                  <td
                    class="border-bottom border-dark"
                    style="width: 150px"
                  ></td>
                </tr>
                <tr>
                  <td class="text-end">Effective:</td>
                  <td
                    class="border-bottom border-dark"
                    style="width: 150px"
                  ></td>
                </tr>
              </tbody>
            </table>
          </td>
          <td class="align-bottom">
            <table class="w-100">
              <tbody>
                <tr>
                  <td class="text-end">End:</td>
                  <td
                    class="border-bottom border-dark"
                    style="width: 150px"
                  ></td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

const PrintNotes = () => (
  <>
    <h6 class="fw-bold pt-4">
      Supporting Evidence, if any (please describe; attach copies of any
      documentation):
    </h6>
    <table class="w-100">
      <tbody>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
      </tbody>
    </table>

    <h6 class="fw-bold pt-4">Employee's Comments:</h6>
    <table class="w-100">
      <tbody>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
      </tbody>
    </table>

    <h6 class="fw-bold pt-4">Other Individuals who may have information:</h6>
    <table class="w-100">
      <tbody>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
      </tbody>
    </table>

    <h6 class="fw-bold pt-4">
      Supporting Documentation, if any (please describe; attach copies of any
      documentation):
    </h6>
    <table class="w-100">
      <tbody>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
      </tbody>
    </table>

    <h6 class="fw-bold pt-4">Corrective Action Plan:</h6>
    <table class="w-100">
      <tbody>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
      </tbody>
    </table>

    <h6 class="fw-bold pt-4">Next Action Step if Problem Continues:</h6>
    <table class="w-100">
      <tbody>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
        <tr>
          <td class="border-bottom border-dark w-100">&nbsp;</td>
        </tr>
      </tbody>
    </table>

    <h6 class="fw-bold pt-4">Follow up</h6>
    <table class="w-100">
      <tbody>
        <tr>
          <td>
            <input type="checkbox" class="mx-1" />
            Two weeks
          </td>
          <td>
            <input type="checkbox" class="mx-1" />
            One month
          </td>
          <td>
            <input type="checkbox" class="mx-1" />
            Three months
          </td>
          <td>
            <input type="checkbox" class="mx-1" />
            Six months
          </td>
          <td>
            <input type="checkbox" class="mx-1" />
            Others:_________________________
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

const PrintFooter = (data: Violation | undefined) => (
  <>
    <p class="pt-4">
      I acknowledge receipt of this disciplinary action and that its contents
      have been discussed with me. Refusal to sign will not invalidate this
      disciplinary action and may constitute another violation of the Company
      Code of Conduct. I understand that this form will be placed in my
      personnel file/record.
    </p>
    <p class="pt-4">
      (Moila ako nga nakadawat ako niining “disciplinary action” ug nga ang
      naksulat dinhi gipasabot kanako. Ang pagdumili sa pagpirma niini dili
      makawagtang niining “disciplinary action” ug mahimo hinuon kini nga laing
      kalapasan sa Company Code of Conduct. Ako nakasabot nga kini nga dokumento
      mabutang sa akong “personnel file” o record.)
    </p>

    <table
      class="w-100"
      style="border-spacing: 10px; border-collapse: separate"
    >
      <tbody>
        <tr style="height: 40px">
          <td class="text-center">{data?.employeeName}</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td class="w-50 text-center border-top border-dark">
            Employee's Printed Name & Signature
          </td>
          <td class="w-50 text-center border-top border-dark">Date</td>
        </tr>
        <tr style="height: 25px">
          <td class="w-50 text-center">
            <input type="checkbox" class="mx-1" />
            Refused to sign
          </td>
          <td class="w-50">&nbsp;</td>
        </tr>
        <tr style="height: 40px">
        <td class="text-center">{data?.deptHead}</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td class="w-50 text-center border-top border-dark">
            Department Head Printed Name & Signature
          </td>
          <td class="w-50 text-center border-top border-dark">Date</td>
        </tr>
        <tr style="height: 40px">
        <td class="text-center">MERLITA VASQUEZ</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td class="w-50 text-center border-top border-dark">
            Supervisor's Printed Name & Signature
          </td>
          <td class="w-50 text-center border-top border-dark">Date</td>
        </tr>
        <tr style="height: 40px">
        <td class="text-center">EDSON GO</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td class="w-50 text-center border-top border-dark">
            Manager's Printed Name & Signature
          </td>
          <td class="w-50 text-center border-top border-dark">Date</td>
        </tr>
      </tbody>
    </table>
  </>
);

export const Print = () => {
  const auth = useContext(AuthContext);
  const params = useParams();

  const [data] = createResource(() =>
    violationGetByControlNumber(params.id, auth.user()?.token)
  );

  return (
    <Show when={data()}>
      <div class="m-auto" style="width: 800px">
        <PrintHeader />
        <table class="w-100">
          <tbody>
            <tr>
              <td class="text-end">EMPLOYEE:</td>
              <td class="px-2">{data()?.employeeName}</td>
              <td class="text-end">ID NUMBER:</td>
              <td class="px-2">{data()?.employeeNumber}</td>
            </tr>
            <tr>
              <td class="text-end">DEPARTMENT:</td>
              <td class="px-2">{data()?.department}</td>
              <td class="text-end">POSITION:</td>
              <td class="px-2">{data()?.position}</td>
            </tr>
            <tr>
              <td class="text-end">DEPT. HEAD:</td>
              <td class="px-2">{data()?.deptHead}</td>
              <td class="text-end">CONTROL #:</td>
              <td class="px-2">{data()?.controlNumber}</td>
            </tr>
          </tbody>
        </table>
        <hr />

        <PrintAction />
        <hr />

        <table class="w-100">
          <tbody>
            <tr>
              <td class="text-end">Date(s) of Incident:</td>
              <td class="border-bottom border-dark" style="width: 200px">
                {data()?.dateOfIncident}
              </td>
              <td class="text-end">Time of Incident:</td>
              <td class="border-bottom border-dark" style="width: 200px">
                {data()?.timeOfIncident}
              </td>
            </tr>
          </tbody>
        </table>
        <hr />

        <h6 class="fw-bold">Description of the Incident(s) or Behavior(s):</h6>
        <table class="w-100">
          <tbody>
            <tr>
              <td class="border-bottom border-dark w-100">{data()?.incidentDescription}</td>
            </tr>
            <tr>
              <td class="border-bottom border-dark w-100">&nbsp;</td>
            </tr>
          </tbody>
        </table>

        <table class="w-100 m-2">
          <tbody>
            <tr>
              <td>Under: {data()?.under}</td>
              <td>Violation #: {data()?.violation}</td>
              <td>Penalty: {data()?.penalty}</td>
              <td>No. of Times: {data()?.numberOfTimes}</td>
            </tr>
          </tbody>
        </table>
        <div class="p-2 fw-bold">Reported by: {data()?.reportedBy}</div>

        <PrintNotes />
        {PrintFooter(data())}
      </div>
    </Show>
  );
};
