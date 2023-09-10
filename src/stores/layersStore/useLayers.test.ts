import { renderHook } from "@testing-library/react";
import * as MapsApiCommon from "@deck.gl/carto/typed/api/maps-api-common";

import useLayers from "./useLayers";
import { act } from "react-dom/test-utils";

vi.mock("@deck.gl/carto/typed", async () => {
  const { MAP_TYPES } = await vi.importActual<typeof MapsApiCommon>(
    "@deck.gl/carto/dist/esm/api/maps-api-common"
  );

  const layersLoaded = new Set<string>();

  class CartoLayer {
    id: string;
    props: Record<string, unknown>;

    constructor(
      props: {
        id: string;
        onDataLoad: () => void;
        onDataError: () => void;
      } & Record<string, unknown>
    ) {
      this.id = props.id;
      this.props = props;

      // simulate async data loading
      if (!layersLoaded.has(props.id)) {
        setTimeout(() => {
          if (layersLoaded.has(props.id)) {
            return;
          }

          if (layersLoaded.size === 0) {
            props.onDataError();
          } else {
            props.onDataLoad();
          }

          layersLoaded.add(props.id);
        });
      }
    }
  }

  return {
    MAP_TYPES,
    CartoLayer,
  };
});

describe("useLayers", () => {
  it("should return 3 layers", () => {
    const { result } = renderHook(() => useLayers());

    expect(result.current.layers).toHaveLength(3);
  });

  test.each([
    ["getFillColor", [255, 0, 0], 0],
    ["getLineColor", [255, 0, 0], 1],
    ["getPointRadius", new Number(10), 2],
  ])(`should update %s`, (propName, propValue, layerIndex) => {
    const { result } = renderHook(() => useLayers());

    const originalLayers = result.current.layers;
    const targetOriginalLayer = originalLayers[layerIndex];

    act(() => {
      result.current.updateLayerProps(targetOriginalLayer.id, {
        [propName]: propValue,
      });
    });

    expect(result.current.layers).toHaveLength(3);
    expect(result.current.layers[layerIndex].props[propName]).toBe(propValue);
    // other layers should not be changed
    for (let index = 0; index <= 2; index++) {
      if (index !== layerIndex) {
        expect(result.current.layers[index]).toBe(originalLayers[index]);
      }
    }
  });

  it("should initialize load state of the layers", () => {
    const { result } = renderHook(() => useLayers());

    const layers = result.current.layers;

    expect(result.current.getLayerDataLoadState(layers[0].id)).toBe("loading");
    expect(result.current.getLayerDataLoadState(layers[1].id)).toBe("loading");
    expect(result.current.getLayerDataLoadState(layers[2].id)).toBe("loading");
  });

  it("should update load state of the layers", () => {
    vi.useFakeTimers();

    const { result } = renderHook(() => useLayers());

    act(() => {
      vi.runAllTimers();
    });

    const layers = result.current.layers;

    expect(result.current.getLayerDataLoadState(layers[0].id)).toBe("error");
    expect(result.current.getLayerDataLoadState(layers[1].id)).toBe("success");
    expect(result.current.getLayerDataLoadState(layers[2].id)).toBe("success");
  });
});
